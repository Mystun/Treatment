package controller

import (
	"net/http"

	"github.com/Mystun/treatmentsa/entity"
	"github.com/gin-gonic/gin"
)
// POST /treatmentrecords
func CreateTreatmentRecord(c *gin.Context) {

	var treatmentrecord entity.TreatmentRecord
	var doctor entity.Doctor
	var admission entity.Admission
	var medicine entity.Medicine
	var equipment entity.Equipment

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร treatmentrecord
	if err := c.ShouldBindJSON(&treatmentrecord); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา doctor ด้วย id
	if tx := entity.DB().Where("id = ?", treatmentrecord.DoctorID).First(&doctor); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "doctor not found"})
		return
	}

	// ค้นหา admission ด้วย id
	if tx := entity.DB().Where("id = ?", treatmentrecord.AdmissionID).First(&admission); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "admission record not found"})
		return
	}

	// ค้นหา medicine ด้วย id
	if tx := entity.DB().Where("id = ?", treatmentrecord.MedID).First(&medicine); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "medicine record not found"})
		return
	}

	// ค้นหา Equipment ด้วย id
	if tx := entity.DB().Where("id = ?", treatmentrecord.EquipmentID).First(&equipment); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "equipment not found"})
		return
	}

	// สร้าง Treatment Record
	tr := entity.TreatmentRecord{
		Admission:	admission,         
		Doctor:   	doctor,                         
		RecordDate:	treatmentrecord.RecordDate,
		FoodType: 	treatmentrecord.FoodType,
		Medicine: 	medicine,
		MedAmount: 	treatmentrecord.MedAmount,
		Equipment:	equipment,
		Cost: 		treatmentrecord.Cost,
	}
	// 12: บันทึก
	if err := entity.DB().Create(&tr).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": tr})
}

// GET /treatmentrecord/:id
func GetTreatmentRecord(c *gin.Context) {
	var treatmentrecord entity.TreatmentRecord
	id := c.Param("id")
	if err := entity.DB().Preload("Admission").Preload("Doctor").Preload("Medicine").Preload("Equipment").Raw("SELECT * FROM treatmentrecords WHERE id = ?", id).Find(&treatmentrecord).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": treatmentrecord})
}

// GET /treatmentrecord
func ListTreatmentRecord(c *gin.Context) {
	var treatmentrecord []entity.TreatmentRecord
	if err := entity.DB().Preload("Admission").Preload("Doctor").Preload("Medicine").Preload("Equipment").Raw("SELECT * FROM treatmentrecords").Find(&treatmentrecord).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": treatmentrecord})
}

// PATCH /treatmentrecord
func UpdateTreatmentRecord(c *gin.Context) {
	var treatmentrecord entity.TreatmentRecord
	if err := c.ShouldBindJSON(&treatmentrecord); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", treatmentrecord.ID).First(&treatmentrecord); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "treatment record not found"})
		return
	}

	if err := entity.DB().Save(&treatmentrecord).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": treatmentrecord})
}

// DELETE /treatmentrecord/:id
func DeleteTreatmentRecord(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM treatmentrecords WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "treatment record not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}