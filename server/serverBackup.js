
// const express = require('express')
// const app = express()
// const app2 = express()
// const cors = require('cors')
// const mercadopago = require('mercadopago')
// const nodemailer = require('nodemailer')
// require('dotenv').config()

// app.use(express.json())
// app2.use(express.json())
// app.use(cors())
// app2.use(cors())

// // NODE MAILER
// // Define your list of orders (replace with your actual data)
// const orders = [
//     { id: 1, email: 'grammarfy@gmail.com'},
//     { id: 2, email: 'englishsensation@gmail.com'}
// ]

// app2.get('/', function (req, res) {
//     res.send('Nodemailer is working in port 8081')
// })

// app2.listen(8081, () => {
//     console.log('The server is running on port 8081')
    
// })

// // Create a nodemailer transporter (replace with your email configuration)
// const transporter = new nodemailer.createTransport({
//     service: 'hostinger',
//     auth: {
//         user: process.env.MY_EMAIL, 
//         pass: process.env.PASSWORD,
//     }
// })

// // Define a route to send emails
// app2.get('/send-changes-emails', async (req, res) => {
//     try {
//         for (const order of orders) {
//             const emailOptions = {
//                 from: process.env.MY_EMAIL,
//                 to: order.email,
//                 subject: 'Felicitaciones por su compra',
//                 text: `Thank you for your order! Here is your profile link: `+ 
//                 `http://localhost:3000/profile/`
//                 // You can also use HTML for the email body
//                 // html: `<p> Thank you for your order! Here is your <a href:http://localhost:3000/profile/> profile link </a> </p>`
//             }

//             // Send the email
//             await transporter.sendMail(emailOptions)
//         }
//         res.send('Email sent successfully!')

//     } catch (error) {
//         console.error('Error sending emails', error)
//         res.status(500).send('Error sending emails')
//     }

// } )

// // MERCADO PAGO
// let paymentStatus = 'pending'

// mercadopago.configure({
//     access_token: process.env.API_KEY,
// })

// app.get("/", function (req, res) {
//     res.send("Mercado pago is working in port 8080")
// })

// app.post("/create-preference", (req, res) => {
//     let preference = {
//         items: [
//             {
//                 title: req.body.description,
//                 unit_price: Number(req.body.price),
//                 quantity: Number(req.body.quantity),
//             }
//         ],
//         back_urls: {
//             success: "http://localhost:3000/producto",
//             faillure: "http://localhost:3000/",
//             pending: "",
//         },
//         auto_return: "approved",
//     }

//     mercadopago.preferences
//     .create(preference)
//     .then(function (response) {
//         res.json({
//             id: response.body.id,
//         })
//     } )
//     .catch(function (error) {
//         console.log(error)
//     })
// })

// app.listen(8080, () => {
//     console.log("the server is running on port 8080")
// })
