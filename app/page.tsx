"use client"
import { useEffect, useState, FormEvent } from "react";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css"
import Image from "next/image";


interface Student{
id?: string,
name: string,
email:string,
phone_number:string,
gender:string
  
}





export default function Home() {

 
  
const [students, setStudents] = useState<Student[]>([])
const [form, setForm] = useState<Student>({
name:"",
email:"",
phone_number:"",
gender:""
})

const [editId, setEditId] = useState<string | null> (null)


useEffect(
() => {
  fetchStudents ()
}, [])

async function handleFormSubmit (event: FormEvent<HTMLFormElement>){

  event.preventDefault()

  if(editId){

const {error}= await supabase.from<Student>("students").update ([form]).eq ("id", editId)

if (error){

  toast.error("Failed to update student")
} else {

toast.success("Student updated succesfully")


}


  } else { 

  const{error}= await supabase.from<Student>("students").insert([form])

if(error){
toast.error( `Failed to create ${error.message}`)

} else {
toast.success("Student added successfully")

} setForm({name:"",
email:"",
phone_number:"",
gender:""})


  }

fetchStudents()



}

async function fetchStudents(){

const {data,error} = await supabase.from ("students").select ("*")

if (error){
toast.error(`Failed to read data ${error.message}`)

} else {
setStudents ( data || [])

}

}

function handleStudentEdit(student:Student){

setForm(student)
if(student.id){
setEditId(student.id)

}

}

async function handleStudentDelete (id: string){

const result= await Swal.fire( {
    title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
})
if (result.isConfirmed){
const {error} = await supabase.from<Student>("students").delete().eq ("id", id)

if (error){
  toast.error("Failed to delete student") 
} else{

toast.success ("Student deleted sucessfully")
fetchStudents()

}

}



}











  return (
    <>

    <div className="youtube-container">

       <iframe
    src={`https://www.youtube.com/embed/Ubup-6yDR9E`}
      title="YouTube Video"
      allowFullScreen
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      style={{ width: '100%', height: '400px' }} // Adjust as needed
    ></iframe>

</div>
<div className="title-container">

  <Image  src="/udgvirtual_logo_esquina.svg" alt="" width={300} height={100}/>
<h3 className="mb-4">Registro de Participantes</h3>
<p>Registro de los estudiantes que participarán en la Primera Carrera Internacional Juvenil</p>
</div>




 <div className="container my-5">

<div className="row">
  <div className="col-md-4">
<div className="card mb-4">
<div className="card-body">

  <form   onSubmit={handleFormSubmit}>
<div className="mb-3">
<label className="form-label">Nombre</label>
<input type="text" className="form-control" placeholder="Ingresa nombre completo" value={form.name} onChange={(event) => setForm ({
...form, name: event.target.value})
}></input>
</div>

<div className="mb-3">
<label className="form-label">Email</label>
<input type="email" className="form-control" placeholder="Ingresa un email" value={form.email} onChange={(event) => setForm ({
...form,email: event.target.value})}></input>
</div>

<div className="mb-3">
<label className="form-label">Número telefónico</label>
<input type="text" className="form-control" placeholder="Ingresa un número telefónico" value={form.phone_number }   onChange={(event) => setForm ({
...form,phone_number: event.target.value})
}></input>
</div>

<div className="mb-3">
<label className="form-label"> Género</label>
<select className="form-select" value={form.gender}  onChange={(event) => setForm
 ({...form,
gender: event.target.value})


}>
  <option value="Selecciona">Selecciona</option>
<option value="Masculino">Masculino</option>
<option value="Femenino">Femenino</option>
<option value="otro">Otro</option>
</select>
</div>
<button className="btn btn-primary w-100"> 
{editId ? "Actualizar": "Agregar"}</button>
  </form>
  
   </div>
</div>
  </div>


<div className="col-md-8">
<div className="table-responsive">
<table className="table table-bordered">
<thead className="table-light">

  <tr>
<th>Nombre</th>
<th>Email</th>
<th>Número telefónico</th>
<th>Género</th>
<th>Acción</th>
  </tr>

</thead>

<tbody>
{
students.map((singleStudent) => (

<tr key={singleStudent.id}>
  <td >{singleStudent.name}</td>
  <td >{singleStudent.email}</td>
  <td >{singleStudent.phone_number}</td>
  <td >{singleStudent.gender}</td>

  <td>
       
  <button className="btn btn-warning btn-sm me-2 " onClick={() => handleStudentEdit(singleStudent)}>Edit</button>
    <button className="btn btn-danger btn-sm me-2 " onClick={() => singleStudent.id && handleStudentDelete(singleStudent.id)}>Delete</button>

  </td>


</tr>



)


)



}
</tbody>


</table>



</div>

</div>



</div>

 </div>
    
    
    </>
  );
}

