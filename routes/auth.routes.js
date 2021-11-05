const express = require('express')

const {check, validationResult} = require('express-validator')
const Students = require('../models/Students')

// const Router = require('koa-router')
app = express()


app.post('/new',
    [
      check('firstName', 'некоректное имя').isString(),
        check('lastName', 'некоректное прозвище').isString(),
        check('age', 'некоректний возраз используйте цифри').isNumeric()
    ],
    async (req, res) =>{
 try{
     const errors = validationResult(req)
     if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array(),
            message : 'некоректние дание при добавлении юзера'
        })
     }
     const { body} = req
     const {id, firstName, lastName, age, nationality,} = body
     const studentIsExist = await  Students.findOne({id})
     if (studentIsExist){
         return res.status(400).json({message:'asdfasdfasdf'})
     }else {
         const student = new Students({id, firstName, lastName, age, nationality})
         await student.save()
     }

     res.status(201).json({message: 'fasfdafgsafg'})

 }catch (e) {
     res.status(500).json({message: 'sssdadfasf'})
 }
})

app.post('/init', async (req,res) => {
    const {body} = req
    console.log(body, 'sgswg')
     const nationality = []
    Students.find().where('nationality').select('nationality').exec(function (err, students) {
        students.map(student => {
            if(!nationality.includes(student.nationality)){
                nationality.push(student.nationality)
            }
            nationality.sort((a,b) => a.localeCompare(b))

        })
        res.json({nationality})
    })


    body.map(async item => {
        const {id, firstName, lastName, age, nationality} = item
        const student = new Students({id, firstName, lastName, age, nationality})
        const findStudent = await Students.findOne({id})
        if(!findStudent) {
            await student.save()
        }
    })

})

app.post('/nationality', async (req, res) => {
    const {body} = req
    let student
    let nationalityGroup = []
    Students.find({nationality: body.studentsNationality}).select('firstName  lastName age').exec((error, result)=>{
        result.map(item => {
            student = `${item.firstName}  ${item.lastName}  (${item.age})`
            nationalityGroup.push(student)
        })
        res.json(nationalityGroup)
    })
})

module.exports = app

