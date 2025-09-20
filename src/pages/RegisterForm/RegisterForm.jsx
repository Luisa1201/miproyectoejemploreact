import React from "react";
import "./RegisterForm.css";
import { Link, useNavigate} from "react-router-dom"
import { useState } from "react";
import Swal from "sweetalert2";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";

function RegisterForm({ onBackToLogin }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useNavigate({
    nombres: "", correo:"", password: "", confirmPassword: ""

  });

  const handleChange = (e) =>{
    setFormData ({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
       nombres, correo, password, confirmPassword
    } = formData;

    // Validaciones
    if(
      !nombres || !correo || !password || !confirmPassword
    ){
      return Swal.fire("Todos los campois son obligatorios");
    }
    if(password.length < 6){
      return Swal.fire("la contraseña debe tener al menos 6 caracteres");
    
    }
    if(password !== confirmPassword){
      return Swal.fire("las contraseñas no son iguales");
    }
    try {
      const emaillower = correo.toLocalLowerCase();
       // Crear usuario para el servicio de authenticación de firebase
      const userMethod = await createUserWithEmailAndPassword(auth, emaillower, password);
      const user = userMethod.user;

      //Guardar datos en firebase
      await setDoc (doc(db, "usuarios", user.uid),{
        uid: user.uid,
        nombres, correo: emaillower, password, confirmPassword, estado: "pendiente", 
        rol: "visitante", creado: new Date(), metodo: "password"
      });

      Swal.fire("Registrado", "Usuario creado con éxito", "success");
      navigate("/")
    }catch (error){
      console.error("Error de registro", error);

      if(error.code === "auth/email-already-in-use"){
        Swal.fire("Correo en uso", "Debe ingresar error", "error");
      }

    }
  }

  return (
    <div className="register-body">
    <div className="register-container">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <input type="text" placeholder="Nombre completo" required value={formData.nombres} onChange={handleChange}/>
        <input type="email" placeholder="Correo electrónico" required value={formData.correo} onChange={handleChange} />
        
        <input type={showPassword ? "text" :"password"}
        name="password"
        placeholder="Contraseña" 
        required value={formData.password} 
        onChange={handleChange}/>

        <input type="password" placeholder="Confirmar contraseña" required value={formData.confirmPassword} onChange={handleChange}/>
        <button type="submit">Crear cuenta</button>
      </form>
      <p className="auth-text">
        ¿Ya tienes cuenta?{" "}
        <button type="button" className="login-btn" onClick={onBackToLogin}>
          Inicia sesión
        </button>
      </p>
    </div>
    </div>
  );
}

export default RegisterForm;
