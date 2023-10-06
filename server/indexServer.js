const express = require('express')
const app = express()
const cors = require('cors')
const mercadopago = require('mercadopago')
const nodemailer = require('nodemailer')

app.use(express.json())
app.use(cors())
require('dotenv').config()

// NODE MAILER
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_PASSWORD,
    }
    
})

// NEWSLETTER EMAILS
app.get('/send-newsletter-emails', async (req, res ) => {
    try {
        let { email } = req.query

        const emailOptions = {
            from: process.env.ADMIN_EMAIL,
            to: email,
            subject: '¡Newsletter de Kwali!',
            html: ` 
            <table role='presentation' cellspacing='0' cellpadding='0' border='0' align='left'>

                <tr>
                    <td>
                        <img width='200' height='150' src='https://kwali.vercel.app/images/identidad/isotipo.png'/>
                    </td>
                </tr>
                <tr>    
                    <td>
                        <p> <strong>Estamos encantados de conocerte.</strong></p>
                        <p>Tenemos la mejor selección de productos listos para personalizar y ser tuyos, todo desde la <br>
                        comodidad de tu hogar.</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <img src='https://kwali.vercel.app/images/productos/ejemplo-holografico.png' width='200' height='150'/>
                        <img src='https://kwali.vercel.app/images/productos/ejemplo-metalgold.png' width='200' height='150'/>
                        <img src='https://kwali.vercel.app/images/productos/ejemplo-metalsilver.png' width='200' height='150'/>
                    </td>
                </tr>  
                <tr>
                    <td align='left' style='border-radius: 5px; background-color: #007bff;'> 
                        <a href='http://localhost:3000/productos' target='_blank' 
                        style='padding: 10px 20px; display: inline-block; font-family: sans-serif; font-size: 14px; 
                        color: #ffffff; text-align: center; text-decoration: none; border-radius: 5px; '> 
                        COMPRAR AHORA 
                        </a>  
                    </td>
                </tr>
                <tr>
                    <td>
                        <p>¿Aún no sabes por dónde empezar?</p>
                        <p>Mira aquí todas nuestras guías y tutoriales para que puedas realizar tu pedido sin <br>
                        problemas</p>
                    </td>
                <tr>
                    <td align='left' style='border-radius: 5px; background-color: #007bff;'> 
                        <a href='http://localhost:3000/como-ordenar' target='_blank' 
                        style='padding: 10px 20px; display: inline-block; font-family: sans-serif; font-size: 14px; 
                        color: #ffffff; text-align: center; text-decoration: none; border-radius: 5px; '> 
                        COMPRAR AHORA 
                        </a>  
                    </td>
                </tr>

            <table> `
            
        }



        await transporter.sendMail(emailOptions)
        res.send('Email newsletter sent successfully!')

    } catch (error) {
        console.error('Error sending newsletter emails', error)
        res.status(500).send('Error sending newsletter emails')
    }
})

// REGISTER EMAILS
app.get('/send-register-emails', async (req, res ) => {
    try {
        let { email } = req.query

        const emailOptions = {
            from: process.env.ADMIN_EMAIL,
            to: email,
            subject: '¡Bienvenido a Kwali!',
            html: ` 
            <table role='presentation' cellspacing='0' cellpadding='0' border='0' align='left'>

                <tr>
                    <td>
                        <img width='200' height='150' src='https://kwali.vercel.app/images/identidad/isotipo.png'/>
                    </td>
                </tr>
                <tr>    
                    <td>
                        <p> <strong>Estamos encantados de conocerte.</strong></p>
                        <p>Tenemos la mejor selección de productos listos para personalizar y ser tuyos, todo desde la <br>
                        comodidad de tu hogar.</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <img src='https://kwali.vercel.app/images/productos/ejemplo-holografico.png' width='200' height='150'/>
                        <img src='https://kwali.vercel.app/images/productos/ejemplo-metalgold.png' width='200' height='150'/>
                        <img src='https://kwali.vercel.app/images/productos/ejemplo-metalsilver.png' width='200' height='150'/>
                    </td>
                </tr>  
                <tr>
                    <td align='left' style='border-radius: 5px; background-color: #007bff;'> 
                        <a href='http://localhost:3000/productos' target='_blank' 
                        style='padding: 10px 20px; display: inline-block; font-family: sans-serif; font-size: 14px; 
                        color: #ffffff; text-align: center; text-decoration: none; border-radius: 5px; '> 
                        COMPRAR AHORA 
                        </a>  
                    </td>
                </tr>
                <tr>
                    <td>
                        <p>¿Aún no sabes por dónde empezar?</p>
                        <p>Mira aquí todas nuestras guías y tutoriales para que puedas realizar tu pedido sin <br>
                        problemas</p>
                    </td>
                <tr>
                    <td align='left' style='border-radius: 5px; background-color: #007bff;'> 
                        <a href='http://localhost:3000/como-ordenar' target='_blank' 
                        style='padding: 10px 20px; display: inline-block; font-family: sans-serif; font-size: 14px; 
                        color: #ffffff; text-align: center; text-decoration: none; border-radius: 5px; '> 
                        COMPRAR AHORA 
                        </a>  
                    </td>
                </tr>

            <table> `
            
        }



        await transporter.sendMail(emailOptions)
        res.send('Email register sent successfully!')

    } catch (error) {
        console.error('Error sending register emails', error)
        res.status(500).send('Error sending register emails')
    }
})

// ORDER EMAILS
app.get('/send-order-emails', async (req, res ) => {
    try {
        let { email } = req.query

        const emailOptions = {
            from: process.env.ADMIN_EMAIL,
            to: email,
            subject: '¡Bienvenido a Kwali!',
            html: ` 
            <table role='presentation' cellspacing='0' cellpadding='0' border='0' align='left'>

                <tr>
                    <td>
                        <img width='200' height='150' src='https://kwali.vercel.app/images/identidad/isotipo.png'/>
                    </td>
                </tr>
                <tr>    
                    <td>
                        <p> <strong>Estamos encantados de conocerte.</strong></p>
                        <p>Tenemos la mejor selección de productos listos para personalizar y ser tuyos, todo desde la <br>
                        comodidad de tu hogar.</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <img src='https://kwali.vercel.app/images/productos/ejemplo-holografico.png' width='200' height='150'/>
                        <img src='https://kwali.vercel.app/images/productos/ejemplo-metalgold.png' width='200' height='150'/>
                        <img src='https://kwali.vercel.app/images/productos/ejemplo-metalsilver.png' width='200' height='150'/>
                    </td>
                </tr>  
                <tr>
                    <td align='left' style='border-radius: 5px; background-color: #007bff;'> 
                        <a href='http://localhost:3000/productos' target='_blank' 
                        style='padding: 10px 20px; display: inline-block; font-family: sans-serif; font-size: 14px; 
                        color: #ffffff; text-align: center; text-decoration: none; border-radius: 5px; '> 
                        COMPRAR AHORA 
                        </a>  
                    </td>
                </tr>
                <tr>
                    <td>
                        <p>¿Aún no sabes por dónde empezar?</p>
                        <p>Mira aquí todas nuestras guías y tutoriales para que puedas realizar tu pedido sin <br>
                        problemas</p>
                    </td>
                <tr>
                    <td align='left' style='border-radius: 5px; background-color: #007bff;'> 
                        <a href='http://localhost:3000/como-ordenar' target='_blank' 
                        style='padding: 10px 20px; display: inline-block; font-family: sans-serif; font-size: 14px; 
                        color: #ffffff; text-align: center; text-decoration: none; border-radius: 5px; '> 
                        COMPRAR AHORA 
                        </a>  
                    </td>
                </tr>

            <table> `
            
        }



        await transporter.sendMail(emailOptions)
        res.send('Email order sent successfully!')

    } catch (error) {
        console.error('Error sending order emails', error)
        res.status(500).send('Error sending order emails')
    }
})

// DELIVER EMAILS
app.get('/send-deliver-emails', async (req, res ) => {
    try {
        let { email } = req.query

        const emailOptions = {
            from: process.env.ADMIN_EMAIL,
            to: email,
            subject: 'Producto enviado Kwali!',
            html: ` 
            <table role='presentation' cellspacing='0' cellpadding='0' border='0' align='left'>

                <tr>
                    <td>
                        <img width='200' height='150' src='https://kwali.vercel.app/images/identidad/isotipo.png'/>
                    </td>
                </tr>
                <tr>    
                    <td>
                        <p> <strong>Estamos encantados de conocerte.</strong></p>
                        <p>Tenemos la mejor selección de productos listos para personalizar y ser tuyos, todo desde la <br>
                        comodidad de tu hogar.</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <img src='https://kwali.vercel.app/images/productos/ejemplo-holografico.png' width='200' height='150'/>
                        <img src='https://kwali.vercel.app/images/productos/ejemplo-metalgold.png' width='200' height='150'/>
                        <img src='https://kwali.vercel.app/images/productos/ejemplo-metalsilver.png' width='200' height='150'/>
                    </td>
                </tr>  
                <tr>
                    <td align='left' style='border-radius: 5px; background-color: #007bff;'> 
                        <a href='http://localhost:3000/productos' target='_blank' 
                        style='padding: 10px 20px; display: inline-block; font-family: sans-serif; font-size: 14px; 
                        color: #ffffff; text-align: center; text-decoration: none; border-radius: 5px; '> 
                        COMPRAR AHORA 
                        </a>  
                    </td>
                </tr>
                <tr>
                    <td>
                        <p>¿Aún no sabes por dónde empezar?</p>
                        <p>Mira aquí todas nuestras guías y tutoriales para que puedas realizar tu pedido sin <br>
                        problemas</p>
                    </td>
                <tr>
                    <td align='left' style='border-radius: 5px; background-color: #007bff;'> 
                        <a href='http://localhost:3000/como-ordenar' target='_blank' 
                        style='padding: 10px 20px; display: inline-block; font-family: sans-serif; font-size: 14px; 
                        color: #ffffff; text-align: center; text-decoration: none; border-radius: 5px; '> 
                        COMPRAR AHORA 
                        </a>  
                    </td>
                </tr>

            <table> `
            
        }



        await transporter.sendMail(emailOptions)
        res.send('Email deliver sent successfully!')

    } catch (error) {
        console.error('Error sending deliver emails', error)
        res.status(500).send('Error sending deliver emails')
    }
})


// PREVIEW EMAILS
app.get('/send-preview-emails', async (req, res) => {
    try {
        const { email } = req.query

        const emailOptions = {
            from: process.env.ADMIN_EMAIL,
            to: email,
            subject: 'Confirma tu imagen de prueba Kwali',
            text: `Puedes ver la nueva imagen de prueba Kwali en:` +
            `http://localhost:3000/profile`,
             // You can also use HTML for the email body
             // html: `<p> Thank you for your order! Here is your <a href:http://localhost:3000/profile/> profile link </a> </p>`  
            }

        // Send the email
        await transporter.sendMail(emailOptions)
        res.send('Email preview sent successfully!')
        

    } catch (error) {
        console.error('Error sending preview emails', error)
        res.status(500).send('Error sending preview emails')
    }
})


// APPROVAL EMAILS
app.get('/send-approval-emails', async (req, res ) => {
    try {
        let { email } = req.query

        const emailOptions = {
            from: process.env.ADMIN_EMAIL,
            to: email,
            subject: 'Has confirmado tu imagen de prueba Kwali',
            text: 'Gracias por confirma tu imagen de prueba Kwali, tu pedido está en producción.' +
            'Pueder seguir el proceso en http://localhost:8080/profile'
        }

        const adminEmailOptions = {
            from: process.env.ADMIN_EMAIL,
            to: process.env.ADMIN_EMAIL,
            subject: `${email} ha confirmado su imagen de prueba Kwali`,
            text: 'Hemos enviado un mail diciendo que sy pedido está en producción.' +
            'en http://localhost:8080/profile'
        }


        await transporter.sendMail(emailOptions)
        await transporter.sendMail(adminEmailOptions)
        res.send('Email approval sent successfully!')

    } catch (error) {
        console.error('Error sending approval emails', error)
        res.status(500).send('Error sending approval emails')
    }
})

// CHANGE EMAILS
app.get('/send-change-emails', async (req, res) => {
    try {
        let { email, message } = req.query

        const emailOptions = {
            from: process.env.ADMIN_EMAIL,
            to: email,
            subject: 'Has solicitado un cambio en tu imagen de prueba Kwali',
            text: `Tu mensaje ${message} está siendo procesado`
        }
        const adminEmailOptions = {
            from: process.env.ADMIN_EMAIL,
            to: process.env.ADMIN_EMAIL,
            subject: `${email} ha solicitado un cambio en su imagen de prueba Kwali`,
            text: `${email} ha recibido un diciendo que su cambio ${message} está siendo procesado`
        }
        await transporter.sendMail(emailOptions)
        await transporter.sendMail(adminEmailOptions)

        console.log('Email changes sent successfully!')

    } catch (error) {
        console.error('Error sending changes email', error)
        res.status(500).send('Error sending changes email')
    }
})





// MERCADO PAGO
const paymentStatus = 'pending'

mercadopago.configure({
    access_token: process.env.ACCESS_TOKEN,
})


app.get('/', (req, res) => {
    res.send('MercadoPago and Node Mailer are working on port 8080')
})

app.post('/create-preference', (req, res) => {
    let preference = {
        items: [
            {
                title: req.body.description,
                unit_price: Number(req.body.price),
                quantity: Number(req.body.quantity)
            }
        ],
        back_urls: {
            success: 'http://localhost:3000/producto',
            failure: 'http://localhost:3000/',
            pending: '',
        },
        auto_return: 'approved',
    }

    mercadopago.preferences
    .create(preference)
    .then( function (response) {
        res.json({
            id: response.body.id
        })
    })
    .catch( function (error) {
        console.log(error)
    })
})

app.listen(8080, () => {
    console.log('the server is running on port 8080')
})



