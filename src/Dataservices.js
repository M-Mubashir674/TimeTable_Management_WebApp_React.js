import http from "./http-common";
class DataServices{
    getAllDepartments(){
        return http.get("/departments");
    }
    deleteDepartment(id){
        return http.delete(`/department/${id}`);
    }
    createDepartment(name,semester,section){
        return http.post(`/department/${name}/${semester}/${section}`);
    }
    updateDepartment(id,name,semester,section){
        return http.put(`/department/${id}/${name}/${semester}/${section}`);
    }
    findDepartment(id){
        return http.get(`/department/${id}`);
    }



    getAllCourses(){
        return http.get("/courses");
    }
    deleteCourse(id){
        return http.delete(`/course/${id}`);
    }
    createCourse(name,chour,ins,dep){
        return http.post(`/course/${name}/${chour}/${ins}/${dep}`);
    }
    updateCourse(id,name,chour,ins,dep){
        return http.put(`/course/${id}/${name}/${chour}/${ins}/${dep}`);
    }
    findCourse(id){
        return http.get(`/course/${id}`);
    }

    getAllInstructors(){
        return http.get("/instructors");
    }
    deleteInstructor(id){
        return http.delete(`/instructor/${id}`);
    }
    createInstructor(name,email,qual){
        return http.post(`/instructor/${name}/${email}/${qual}`);
    }
    updateInstructor(id,name,email,qual){
        return http.put(`/instructor/${id}/${name}/${email}/${qual}`);
    }
    findInstructor(id){
        return http.get(`/instructor/${id}`);
    }

    getAllTimetable(){
        return http.get("/timetable");
    }
    deleteTimetable(id){
        return http.delete(`/timetable/${id}`);
    }
    createTimetable(id,subj,room){
        return http.post(`/timetable/${id}/${subj}/${room}`);
    }
    updateTimetable(id,subj,room){
        return http.put(`/timetable/${id}/${subj}/${room}`);
    }
    findTimetable(id){
        return http.get(`/timetable/${id}`);
    }

    create(data){
        return http.post("/tutorial",data);
    }
    update(id,data){
        return http.put(`/tutorial${id}`,data);
    }
    delete(id){
        return http.delete(`/tutorial${id}`);
    }
    validate(data){
        return http.get(`/users/${data.username}/${data.password}`);
    }
}

export default new DataServices();