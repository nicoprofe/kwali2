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
                        <img width='200' height='150' src='https://kwali2-client.vercel.apphttps://kwali2-client.vercel.app/https://kwali2-client.vercel.app/https://kwali2-client.vercel.app/https://kwali2-client.vercel.app/images/identidad/isotipo.png'/>
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
                        <img src='https://kwali2-client.vercel.apphttps://kwali2-client.vercel.app/https://kwali2-client.vercel.app/https://kwali2-client.vercel.app/https://kwali2-client.vercel.app/images/productos/ejemplo-holografico.png' width='200' height='150'/>
                        <img src='https://kwali2-client.vercel.apphttps://kwali2-client.vercel.app/https://kwali2-client.vercel.app/https://kwali2-client.vercel.app/https://kwali2-client.vercel.app/images/productos/ejemplo-metalgold.png' width='200' height='150'/>
                        <img src='https://kwali2-client.vercel.apphttps://kwali2-client.vercel.app/https://kwali2-client.vercel.app/https://kwali2-client.vercel.app/https://kwali2-client.vercel.app/images/productos/ejemplo-metalsilver.png' width='200' height='150'/>
                    </td>
                </tr>  
                <tr>
                    <td align='left' style='border-radius: 5px; background-color: #007bff;'> 
                        <a href='https://kwali2-client.vercel.app/productos' target='_blank' 
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
                        <a href='https://kwali2-client.vercel.app/como-ordenar' target='_blank' 
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
            <body style="Margin: 0; padding: 0; background-color: #f6f9fc;">
            <main style="width: 100%; table-layout: fixed; background-color: #f6f9fc; padding-bottom: 40px; display: flex; align-items: center; justify-content: center;">
                <div style="max-width: 600px; background-color: #ffffff;">
                    <table style="Margin: 0 auto; width: 100%; max-width: 600px; border-spacing: 0; font-family: sans-serif; color: #4a4a4a;">
                        <!-- header -->
                        <tr>
                            <td>
                                <table width="100%" style="background-color: #388cda; padding: 10px; text-align: center;">
                                    <tr>
                                        <td>
                                            <a href="#">
                                                <img src="https://kwali2-client.vercel.app/images/identidad/logo-style2.png" width="180px" alt="Logo" title="Logo" style="border: 0;">
                                            </a>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <!-- banner -->
                        <tr>
                            <td>
                                <a href="#">
                                    <img src="https://kwali2-client.vercel.app/images/identidad/banner tus stickers-07.png" width="600px" alt="Banner" title="Banner" style="max-width: 100%; border: 0;">
                                </a>
                            </td>
                        </tr>
                        <!-- hero -->
                        <tr>
                            <td style="text-align: center; font-size: 0; padding-top: 40px; padding-bottom: 30px;">
                                <!-- column1 -->
                                <table style="width: 100%; max-width: 200px; display: inline-block; vertical-align: top;">
                                    <tr>
                                        <td style="padding: 15px;">
                                            <table style="padding: 15px; border-spacing: 0;">
                                                <tr>
                                                    <td>
                                                        <a href="#">
                                                            <img src="https://kwali2-client.vercel.app/images/productos/holografico.png" width="150" alt="Product1" style="max-width: 150px; border: 0;">
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                  <td style="padding: 10px;">
                                                    <p style="font-size: 17px; font-weight: bold;">HOLOGRAFICO</p>
                                                    <p style="font-size: 15px;">Stickers impresos en un vinilo que crea un efecto "arcoris" o
                                                    "tornasol" al reflejar la luz. Dale vida a tus diseños y
                                                    llama la atención con nuestros stickers holográficos.</p>
                                                    <a style="font-size: 16px; text-decoration: none;
                                                    color: #388cda;" href="#">Learn more..</a>
                                                  </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                                <!-- column2 -->
                                <table style="width: 100%; max-width: 200px; display: inline-block; vertical-align: top;">
                                    <tr>
                                        <td style="padding: 15px;">
                                            <table style="padding: 15px; border-spacing: 0;">
                                                <tr>
                                                    <td>
                                                        <a href="#">
                                                            <img src="https://kwali2-client.vercel.app/images/productos/ejemplo-brillante.png" width="150" alt="Product1" style="max-width: 150px; border: 0;">
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                  <td style="padding: 10px;">
                                                    <p style="font-size: 17px; font-weight: bold;">BRILLANTE</p>
                                                    <p style="font-size: 15px;">Stickers impresos en un vinil blanco resistente al agua y al sol,
                                                    con un acabado brillante y levemente reflejante. Dale ese
                                                    toque profesional a tus stickers con nuestro acabado brillante.</p>
                                                    <a style="font-size: 16px; text-decoration: none;
                                                    color: #388cda;" href="#">Learn more..</a>
                                                  </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                                <!-- column3 -->
                                <table style="width: 100%; max-width: 200px; display: inline-block; vertical-align: top;">
                                    <tr>
                                        <td style="padding: 15px;">
                                            <table style="padding: 15px; border-spacing: 0;">
                                                <tr>
                                                    <td>
                                                        <a href="#">
                                                            <img src="https://kwali2-client.vercel.app/images/productos/ejemplo-matte.png" width="150" alt="Product1" style="max-width: 150px; border: 0;">
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="padding: 10px;">
                                                        <p style="font-size: 17px; font-weight: bold;">MATE</p>
                                                        <p style="font-size: 15px;">Stickers impresos en vinil blanco resistente al agua y al sol,
                                                        con un acabado suave no-reflejante. Perfectos para
                                                        promocionar tu marca o decorar tus objetos.</p>
                                                        <a style="font-size: 16px; text-decoration: none;
                                                        color: #388cda;" href="#">Learn more..</a>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <!-- footer -->
                        <tr>
                            <td>
                                <table width="100%" style="background-color: #388cda; padding: 15px; text-align: center;">
                                    <tr>
                                        <td>
                                            <p style="font-size: 18px; Margin-bottom: 13px; color: #ffffff;">Connect with us</p>
                                            <a href="https://www.facebook.com/checkpoint/1501092823525282/?next=https%3A%2F%2Fwww.facebook.com%2Fkwalimx">
                                                <img src="https://kwali2-client.vercel.app/images/white-facebook.png" width="30" alt="facebook" style="border: 0;">
                                            </a>
                                            <a href="https://www.youtube.com/@KwaliMx">
                                                <img src="https://kwali2-client.vercel.app/images/white-youtube.png" width="30" alt="youtube" style="border: 0;">
                                            </a>
                                            <a href="https://www.instagram.com/kwalimx/">
                                               <img src="https://kwali2-client.vercel.app/images/white-instagram.png" width="30" alt="instagram" style="border: 0;">
                                            </a>
                                            

                                            
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td style="background-color: #efefef;">
                                <table width="100%" style="padding: 20px; text-align: center; padding-bottom: 10px;">
                                    
                                    <tr>
                                        <td style="background-color: #efefef;">
                                            <table width="100%">
                                                <tr>
                                                    <td style="padding: 20px;text-align: center;padding-bottom: 10px;">
                                                        <a href="#">
                                                            <img src="https://kwali2-client.vercel.app/images/identidad/isotipo.png" width="160" alt="">
                                                        </a>
                                                        <p style="font-size: 16px;Margin-top: 18px;Margin-top: 10px;">
                                                            Kwali
                                                        </p>
                                                        <p style="font-size: 16px;Margin-bottom: 10px;">
                                                         Mexicali BC
                                                        </p>
                                                        <p><a href="mailto:info@kwali.us">info@kwali.us</a></p>
                                                        <p><a href="tel:526869458899">+52 686 945 8899</a></p>
                                                    </td>
                                                </tr>
                                                <!-- unsubscribe -->
                                                <tr>
                                                    <td style="padding-bottom: 25px;text-align: center;">
                                                        <p><a style="font-size: 13px;" href="#">UNSUBSCRIBE</a></p>
                                                    </td>
                                                </tr>
                                                <!-- blue line -->
                                                <tr>
                                                    <td height="1" style="background-color: #388cda;">
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </div>
            </main>
        </body>
        
`
            
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
                        <img width='200' height='150' src='https://kwali2-client.vercel.apphttps://kwali2-client.vercel.app/https://kwali2-client.vercel.app/https://kwali2-client.vercel.app/https://kwali2-client.vercel.app/images/identidad/isotipo.png'/>
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
                        <img src='https://kwali2-client.vercel.apphttps://kwali2-client.vercel.app/https://kwali2-client.vercel.app/https://kwali2-client.vercel.app/https://kwali2-client.vercel.app/images/productos/ejemplo-holografico.png' width='200' height='150'/>
                        <img src='https://kwali2-client.vercel.app/productos/ejemplo-metalgold.png' width='200' height='150'/>
                        <img src='https://kwali2-client.vercel.apphttps://kwali2-client.vercel.app/https://kwali2-client.vercel.app/https://kwali2-client.vercel.app/https://kwali2-client.vercel.app/images/productos/ejemplo-metalsilver.png' width='200' height='150'/>
                    </td>
                </tr>  
                <tr>
                    <td align='left' style='border-radius: 5px; background-color: #007bff;'> 
                        <a href='https://kwali2-client.vercel.app/productos' target='_blank' 
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
                        <a href='https://kwali2-client.vercel.app/como-ordenar' target='_blank' 
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
                        <img width='200' height='150' src='https://kwali2-client.vercel.apphttps://kwali2-client.vercel.app/https://kwali2-client.vercel.app/https://kwali2-client.vercel.app/https://kwali2-client.vercel.app/images/identidad/isotipo.png'/>
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
                        <img src='https://kwali2-client.vercel.apphttps://kwali2-client.vercel.app/https://kwali2-client.vercel.app/https://kwali2-client.vercel.app/https://kwali2-client.vercel.app/images/productos/ejemplo-holografico.png' width='200' height='150'/>
                        <img src='https://kwali2-client.vercel.apphttps://kwali2-client.vercel.app/https://kwali2-client.vercel.app/https://kwali2-client.vercel.app/https://kwali2-client.vercel.app/images/productos/ejemplo-metalgold.png' width='200' height='150'/>
                        <img src='https://kwali2-client.vercel.apphttps://kwali2-client.vercel.app/https://kwali2-client.vercel.app/https://kwali2-client.vercel.app/https://kwali2-client.vercel.app/images/productos/ejemplo-metalsilver.png' width='200' height='150'/>
                    </td>
                </tr>  
                <tr>
                    <td align='left' style='border-radius: 5px; background-color: #007bff;'> 
                        <a href='https://kwali2-client.vercel.app/productos' target='_blank' 
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
                        <a href='https://kwali2-client.vercel.app/como-ordenar' target='_blank' 
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
            `https://kwali2-client.vercel.app/profile`,
             // You can also use HTML for the email body
             // html: `<p> Thank you for your order! Here is your <a href:'https://kwali2-client.vercel.app/profile/'> profile link </a> </p>`  
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
            'Pueder seguir el proceso en https://kwali2-client.vercel.app/profile'
        }

        const adminEmailOptions = {
            from: process.env.ADMIN_EMAIL,
            to: process.env.ADMIN_EMAIL,
            subject: `${email} ha confirmado su imagen de prueba Kwali`,
            text: 'Hemos enviado un mail diciendo que sy pedido está en producción.' +
            'en  https://kwali2-client.vercel.app/profile'
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
            success: 'https://kwali2-client.vercel.app/producto',
            failure: 'https://kwali2-client.vercel.app/',
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



