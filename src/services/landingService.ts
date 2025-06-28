import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

interface LandingData {
  telefono: string;
  email: string;
  userAgent: string;
  fecha: string;
  hora: string;
}

export const saveLandingData = async (telefono: string, email: string) => {
  try {
    const now = new Date();
    const landingData: LandingData = {
      telefono,
      email,
      userAgent: navigator.userAgent,
      fecha: now.toLocaleDateString('es-AR'),
      hora: now.toLocaleTimeString('es-AR'),
    };

    const docRef = await addDoc(collection(db, "data-landings"), landingData);
    console.log("Datos guardados con ID: ", docRef.id);
    return true;
  } catch (error) {
    console.error("Error al guardar los datos: ", error);
    return false;
  }
}; 