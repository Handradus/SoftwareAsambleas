import User from '../models/user.model.js';
import Role from '../models/role.model.js';
import transporter from '../config/mailer.js'; 



export async function getCorreos() {
    try {
        const users = await User.find().populate('roles', 'name');
        const correos = users.map(user => user.email);
        return correos;
    } catch (error) {
        console.log("Error al obtener correos ", error);
        throw error;
    }
}

export async function enviarCorreos(req, res) {
    try {
        const correos = await getCorreos();

        correos.forEach(email => {
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Asunto del correo',
                text: 'Mensaje del correo'
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(`Error al enviar el correo a ${email}:`, error);
                } else {
                    console.log(`Correo enviado a ${email}:`, info.response);
                }
            });
        });

        res.status(200).json({ message: 'Correos enviados exitosamente' });
    } catch (error) {
        console.log('Error al enviar los correos:', error);
        res.status(500).json({ message: 'Error al enviar los correos', error });
    }
}