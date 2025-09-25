import user3 from "/assets/images/avatar/user-3.png";
import user2 from "/assets/images/avatar/user-2.png";
import user24 from "/assets/images/avatar/user-24.png";
import user25 from "/assets/images/avatar/user-25.png";
import user26 from "/assets/images/avatar/user-26.png";
import user27 from "/assets/images/avatar/user-27.png";
import user28 from "/assets/images/avatar/user-28.png";
import user10 from "/assets/images/avatar/user-10.png";
import user16 from "/assets/images/avatar/user-16.png";
import user19 from "/assets/images/avatar/user-19.png";
import user15 from "/assets/images/avatar/user-15.png";
import user11 from "/assets/images/avatar/user-11.png";

const staffData = [
    {
        "name": "Linda Sharp",
        "image": user3,
        "role": "Merchandiser, retail",
        "department": "Radiology",
        "email": "fitzgeraldwilliam@gmail.com",
        "phone": "+1 555 123 4567",
        "date": "2021-02-20"
    },
    {
        "name": "Lori Reynolds",
        "image": user2,
        "role": "Clinical molecular geneticist",
        "department": "Orthopedics",
        "email": "wdavidson@warren.org",
        "phone": "+44 20 7946 0958",
        "date": "2020-01-26"
    },
    {
        "name": "Paige Williamson",
        "role": "Product manager",
        "department": "Orthopedics",
        "email": "reneehawkins@king-gonzalez.com",
        "phone": "+61 2 9374 4000",
        "date": "2022-12-30"
    },
    {
        "name": "Russell Hunt",
        "image": user24,
        "role": "Ophthalmologist",
        "department": "Neurology",
        "email": "connie92@gonzalez.com",
        "phone": "+49 30 123456",
        "date": "2021-09-21"
    },
    {
        "name": "Theresa Thomas",
        "image": user25,
        "role": "Cytogeneticist",
        "department": "Orthopedics",
        "email": "eric30@yahoo.com",
        "phone": "+33 1 42 68 53 00",
        "date": "2020-09-04"
    },
    {
        "name": "Caitlin Werner",
        "image": user26,
        "role": "Geneticist, molecular",
        "department": "Orthopedics",
        "email": "kevintaylor@gmail.com",
        "phone": "+34 91 123 45 67",
        "date": "2020-03-07"
    },
    {
        "name": "Stephanie Nguyen",
        "role": "Multimedia programmer",
        "department": "Cardiology",
        "email": "melaniebaker@yahoo.com",
        "phone": "+49 40 123456",
        "date": "2022-04-28"
    },
    {
        "name": "Kelli Miller",
        "image": user27,
        "role": "Mechanical engineer",
        "department": "Cardiology",
        "email": "smithmary@gmail.com",
        "phone": "+81 3 1234 5678",
        "date": "2020-06-09"
    },
    {
        "name": "Nicholas Velasquez",
        "role": "Accounting technician",
        "department": "Radiology",
        "email": "henry54@yahoo.com",
        "phone": "+91 22 1234 5678",
        "date": "2021-02-19"
    },
    {
        "name": "Lydia James",
        "image": user28,
        "role": "Surveyor, commercial/residential",
        "department": "Radiology",
        "email": "patricia63@yahoo.com",
        "phone": "+55 11 1234-5678",
        "date": "2020-08-09"
    },
    {
        "name": "Robert Torres",
        "image": user10,
        "role": "Nurse, children's",
        "department": "Radiology",
        "email": "brettcampos@yoder.com",
        "phone": "+7 495 123-45-67",
        "date": "2021-04-13"
    },
    {
        "name": "Samantha Mcdaniel",
        "image": user16,
        "role": "Claims inspector/assessor",
        "department": "Pediatrics",
        "email": "danielle31@myers.org",
        "phone": "+27 11 123 4567",
        "date": "2021-11-27"
    },
    {
        "name": "Dr. Phillip Carr DDS",
        "role": "Corporate investment banker",
        "department": "Orthopedics",
        "email": "ghall@greer.com",
        "phone": "+65 6 1234 567",
        "date": "2023-05-27"
    },
    {
        "name": "Kelly Schneider",
        "role": "Social researcher",
        "department": "Orthopedics",
        "email": "stevensmith@schmidt.net",
        "phone": "+39 06 123 4567",
        "date": "2022-03-25"
    },
    {
        "name": "Brittany Arnold",
        "image": user19,
        "role": "Waste management officer",
        "department": "Orthopedics",
        "email": "stacystephens@joyce.biz",
        "phone": "+52 55 1234 5678",
        "date": "2020-08-28"
    },
    {
        "name": "Heather Myers",
        "image": user15,
        "role": "Designer",
        "department": "Pediatrics",
        "email": "christinaanderson@hotmail.com",
        "phone": "+86 10 1234 5678",
        "date": "2024-05-22"
    },
    {
        "name": "Elizabeth Martinez",
        "role": "Media buyer",
        "department": "Pediatrics",
        "email": "amber58@hotmail.com",
        "phone": "+31 20 123 4567",
        "date": "2021-04-29"
    },
    {
        "name": "Angela Allen",
        "role": "Armed forces operational officer",
        "department": "Pediatrics",
        "email": "taylorbrandy@hawkins.com",
        "phone": "+46 8 123 4567",
        "date": "2022-11-28"
    },
    {
        "name": "Jennifer Anderson",
        "role": "Secondary school teacher",
        "department": "Orthopedics",
        "email": "jonathan02@patt.biz",
        "phone": "+64 9 123 4567",
        "date": "2024-01-19"
    },
    {
        "name": "Diana Woods",
        "role": "Quality manager",
        "department": "Cardiology",
        "email": "joshuajohnson@d.info",
        "phone": "+45 12 34 56 78",
        "date": "2024-02-14"
    },
    {
        "name": "Natasha Walker",
        "image": user10,
        "role": "Doctor",
        "department": "Cardiology",
        "email": "jscott@perez.com",
        "phone": "+41 21 123 45 67",
        "date": "2022-02-15"
    },
    {
        "name": "Jasmine Benitez",
        "role": "Financial manager",
        "department": "Cardiology",
        "email": "kristinablack@yahoo.com",
        "phone": "+1 604 123 4567",
        "date": "2021-05-15"
    },
    {
        "name": "Mr. William Marquez",
        "role": "Estate agent",
        "department": "Neurology",
        "email": "sara92@thomas.com",
        "phone": "+61 7 1234 5678",
        "date": "2023-01-01"
    },
    {
        "name": "Kevin Black",
        "role": "Teacher, English as a foreign language",
        "department": "Pediatrics",
        "email": "robert29@far.biz",
        "phone": "+55 21 1234-5678",
        "date": "2021-08-27"
    },
    {
        "name": "Sharon Williams",
        "role": "Graphic designer",
        "department": "Radiology",
        "email": "rhodesvictoria@gamil.com",
        "phone": "+86 20 1234 5678",
        "date": "2024-05-02"
    },
    {
        "name": "Kelly Ray",
        "image": user11,
        "role": "Hydrographic surveyor",
        "department": "Radiology",
        "email": "melissa49@schmidt.com",
        "phone": "+64 9 123 4567",
        "date": "2021-12-13"
    },
    {
        "name": "David Fernandez",
        "role": "Park ranger",
        "department": "Neurology",
        "email": "elizabeth29@yahoo.com",
        "phone": "+48 123 456 789",
        "date": "2022-11-22"
    }
];

export default staffData;
