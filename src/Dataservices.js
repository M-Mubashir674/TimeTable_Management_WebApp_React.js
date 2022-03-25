import http from "./http-common";
class DataServices{
    getAllDepartments(){
        return http.get("/departments");
    }
    deleteDepartment(id){
        return http.delete(`/department/${id}`);
    }
    createDepartment(department){
        return http.post("/department",department);
    }
    updateDepartment(department){
        return http.put("/department",department);
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
    createCourse(courses){
        return http.post("/course",courses);
    }
    updateCourse(courses){
        return http.put("/course",courses);
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
    createInstructor(instructor){
        return http.post("/instructor",instructor);
    }
    updateInstructor(instructor){
        return http.put("/instructor",instructor);
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
    createTimetable(timetable){
        return http.post("/timetable",timetable);
    }
    updateTimetable(timetable){
        return http.put("/timetable",timetable);
    }
    findTimetable(id){
        return http.get(`/timetable/${id}`);
    }

    create(data){
        return http.post("/user",data);
    }
    update(id,data){
        return http.put(`/user${id}`,data);
    }
    delete(id){
        return http.delete(`/user${id}`);
    }
    validate(data){
        return http.get(`/users/${data.username}/${data.password}`);
    }
}

export default new DataServices();