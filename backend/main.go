package main

import (
	"github.com/Mystun/treatmentsa/controller"

	"github.com/Mystun/treatmentsa/entity"

	"github.com/gin-gonic/gin"
)

func main() {

	entity.SetupDatabase()

	r := gin.Default()

	// User Routes

	r.GET("/doctors", controller.ListDoctors)
	r.GET("/doctors/:id", controller.GetDoctor)
	r.POST("/doctor", controller.CreateDoctor)
	r.PATCH("/doctor", controller.Updatedoctor)
	r.DELETE("/doctor/:id", controller.Deletedoctor)

	r.GET("/equipments", controller.ListEquipment)
	r.GET("/equipments/:id", controller.GetEquipment)
	r.POST("/equipments", controller.CreateEquipment)
	r.PATCH("/equipments", controller.UpdateEquipment)
	r.DELETE("/equipments/:id", controller.DeleteEquipment)

	r.GET("/admissions", controller.ListAdmission)
	r.GET("/admissions/:id", controller.GetAdmission)
	r.POST("/admissions", controller.CreateAdmission)
	r.PATCH("/admissions", controller.UpdateAdmission)
	r.DELETE("/admissions/:id", controller.DeleteAdmission)

	r.GET("/medicines", controller.ListMedicine)
	r.GET("/medicines/:id", controller.GetMedicine)
	r.POST("/medicines", controller.CreateMedicine)
	r.PATCH("/medicines", controller.UpdateMedicine)
	r.DELETE("/medicines/:id", controller.DeleteMedicine)

	r.GET("/treatmentrecords", controller.ListTreatmentRecord)
	r.GET("/treatmentrecords/:id", controller.GetTreatmentRecord)
	r.POST("/treatmentrecords", controller.CreateTreatmentRecord)
	r.PATCH("/treatmentrecords", controller.UpdateTreatmentRecord)
	r.DELETE("/treatmentrecords/:id", controller.DeleteTreatmentRecord)

	// Run the server

	r.Run()

}
