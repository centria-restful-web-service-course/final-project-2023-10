
# REST API endpoints design
## Student course enrollment

1. Create User:

- Create Student:

    - URI: /users/students
    - Method: POST
    - Resource: Student
    - Data Model:  
    {  
    "name": "Sumiya Chowdhury",   
    "email": "sumiyaC@gmail.com",  
    "password": "********"  
    }

- Create Teacher:

    - URI: /users/teachers
    - Method: POST
    - Resource: Teacher
    - Data Model:  
    {  
    "name": "Jane Doe",  
    "email": "janedoe@example.com",  
    "password": "********"  
    }

2. Create Course:
- URI: /courses
- Method: POST
- Resource: Course
- Data Model:  
{  
  "course_name": "Mathematics 101",  
  "description": {  
    "teacher": "Jane Doe",  
    "starting_date": "2023-10-01",  
    "duration": "3 months",  
    "course_objectives": "Fundamentals of Mathematics"  
  }  
}

3. Update Course:
- URI: /courses/{course_name}
- Method: PUT
- Resource: Course
- Data Model:  
{  
  "course_name": "Mathematics 101 - Advanced",  
  "description": {  
    "teacher": "Jane Doe",  
    "starting_date": "2023-10-01",  
    "duration": "3 months",  
    "course_objectives": "Fundamentals of Mathematics"  
  }  
}

4. Read Course:
- URI: /courses/{course_name}
- Method: GET
- Resource: Course

5. Query/Search Course:
- URI: /courses?query={search_query}
- Method: GET
- Resource: Course

6. Create Enrollment:
- URI: /enrollments
- Method: POST
- Resource: Enrollment
- Data Model:  
{   
  "student_id": "123",  
  "course_name": "Mathematics 101"  
}

7. Update Enrollment:
- URI: /enrollments/{enrollment_id}
- Method: PUT
- Resource: Enrollment
- Data Model:  
{  
  "status": "Accepted"  
}  