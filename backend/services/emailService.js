const nodemailer = require('nodemailer');

// Configuración del transporter de email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'tu-email@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'tu-app-password'
  }
});

// Enviar email de recuperación de contraseña
exports.sendPasswordResetEmail = async (email, resetLink) => {
  const mailOptions = {
    from: process.env.EMAIL_USER || 'tu-email@gmail.com',
    to: email,
    subject: 'Restaura tu contraseña - ISER',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #1d9bf0; padding: 20px; text-align: center; border-radius: 8px;">
          <h1 style="color: white; margin: 0;">ISER</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 5px 0 0 0;">Trabajos de Grado</p>
        </div>
        
        <div style="background-color: #f8fafc; padding: 30px; border-radius: 8px; margin-top: 20px;">
          <h2 style="color: #0f172a; margin-top: 0;">Restaurar tu contraseña</h2>
          <p style="color: #475569; line-height: 1.6;">
            Has solicitado restaurar tu contraseña. Haz clic en el botón de abajo para crear una nueva contraseña.
          </p>
          
          <a href="${resetLink}" style="
            display: inline-block;
            background-color: #1d9bf0;
            color: white;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: bold;
            margin: 20px 0;
          ">
            Restaurar contraseña
          </a>
          
          <p style="color: #64748b; font-size: 14px; margin-top: 20px;">
            Si el botón no funciona, copia y pega este enlace en tu navegador:
          </p>
          <p style="color: #1d9bf0; word-break: break-all; font-size: 12px;">
            ${resetLink}
          </p>
          
          <p style="color: #94a3b8; font-size: 12px; margin-top: 20px; border-top: 1px solid #e2e8f0; padding-top: 15px;">
            Este enlace expirará en 1 hora. Si no solicitaste este correo, puedes ignorarlo.
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #94a3b8; font-size: 12px;">
          <p>© 2026 ISER - Trabajos de Grado. Todos los derechos reservados.</p>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: 'Correo enviado exitosamente' };
  } catch (error) {
    console.error('Error al enviar email:', error);
    return { success: false, error: error.message };
  }
};

// Enviar email de bienvenida al registrarse
exports.sendWelcomeEmail = async (email, nombre) => {
  const mailOptions = {
    from: process.env.EMAIL_USER || 'tu-email@gmail.com',
    to: email,
    subject: '¡Bienvenido a ISER! - Tu cuenta ha sido creada',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #1d9bf0; padding: 20px; text-align: center; border-radius: 8px;">
          <h1 style="color: white; margin: 0;">ISER</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 5px 0 0 0;">Trabajos de Grado</p>
        </div>
        
        <div style="background-color: #f8fafc; padding: 30px; border-radius: 8px; margin-top: 20px;">
          <h2 style="color: #0f172a; margin-top: 0;">¡Bienvenido, ${nombre}!</h2>
          <p style="color: #475569; line-height: 1.6;">
            Tu cuenta ha sido creada exitosamente. Ya puedes iniciar sesión en la plataforma ISER.
          </p>
          
          <div style="background-color: white; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0 0 10px 0; color: #0f172a;"><strong>Datos de tu cuenta:</strong></p>
            <p style="margin: 5px 0; color: #475569;">Email: ${email}</p>
            <p style="margin: 5px 0; color: #475569;">Rol: Estudiante</p>
          </div>
          
          <p style="color: #94a3b8; font-size: 12px; margin-top: 20px; border-top: 1px solid #e2e8f0; padding-top: 15px;">
            © 2026 ISER - Trabajos de Grado. Todos los derechos reservados.
          </p>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: 'Email de bienvenida enviado' };
  } catch (error) {
    console.error('Error al enviar email de bienvenida:', error);
    return { success: false, error: error.message };
  }
};
