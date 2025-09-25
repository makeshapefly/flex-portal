import user1 from '/assets/images/avatar/user-1.png'
import user2 from '/assets/images/avatar/user-2.png'
import user3 from '/assets/images/avatar/user-3.png'
import user4 from '/assets/images/avatar/user-4.png'
import user5 from '/assets/images/avatar/user-5.png'
import user6 from '/assets/images/avatar/user-6.png'
import user7 from '/assets/images/avatar/user-7.png'
import user8 from '/assets/images/avatar/user-8.png'
import user9 from '/assets/images/avatar/user-9.png'
import user10 from '/assets/images/avatar/user-10.png'
import user11 from '/assets/images/avatar/user-11.png'
import user12 from '/assets/images/avatar/user-12.png'
import user13 from '/assets/images/avatar/user-13.png'
import user14 from '/assets/images/avatar/user-14.png'
import user15 from '/assets/images/avatar/user-15.png'
import user16 from '/assets/images/avatar/user-16.png'
import user17 from '/assets/images/avatar/user-17.png'
import user18 from '/assets/images/avatar/user-18.png'
import user19 from '/assets/images/avatar/user-19.png'
import user20 from '/assets/images/avatar/user-20.png'
import user21 from '/assets/images/avatar/user-21.png'
import user22 from '/assets/images/avatar/user-22.png'
import user23 from '/assets/images/avatar/user-23.png'
import user24 from '/assets/images/avatar/user-24.png'
import user25 from '/assets/images/avatar/user-25.png'
import user26 from '/assets/images/avatar/user-26.png'
const patientsData = [
    {
        "image": user1,
        "date": "05 May, 2024",
        "name": "John Doe",
        "email": "john@example.com",
        "phoneNumber": "+1 555 123 4567",
        "insurance": "Yes",
        "location": "Algeria",
        "treatmentType": "Cardiology",
        "doctorName": "Dr. Michael",
        "gender": "Male"
    },
    {
        "image": user2,
        "date": "12 May, 2024",
        "name": "Jane Smith",
        "email": "jane@example.com",
        "phoneNumber": "+44 20 7946 0958",
        "insurance": "No",
        "location": "Argentina",
        "treatmentType": "Dermatology",
        "doctorName": "Dr. Sarah",
        "gender": "Female"
    },
    {
        "image": user3,
        "date": "19 June, 2024",
        "name": "Alice Johnson",
        "email": "alice@example.com",
        "phoneNumber": "+61 2 9374 4000",
        "insurance": "No",
        "location": "Belgium",
        "treatmentType": "Neurology",
        "doctorName": "Dr. Robert",
        "gender": "Female"
    },
    {
        "image": user4,
        "date": "09 Feb, 2024",
        "name": "Robert Brown",
        "email": "robert@example.com",
        "phoneNumber": "+49 30 123456",
        "insurance": "Yes",
        "location": "Mexico",
        "treatmentType": "Orthopedics",
        "doctorName": "Dr. Emily",
        "gender": "Male"
    },
    {
        "image": user5,
        "date": "28 Jan, 2024",
        "name": "Emily Davis",
        "email": "emily@example.com",
        "phoneNumber": "+33 1 42 68 53 00",
        "insurance": "Yes",
        "location": "Russia",
        "treatmentType": "Pediatrics",
        "doctorName": "Dr. James",
        "gender": "Female"
    },
    {
        "image": user6,
        "date": "23 June, 2024",
        "name": "Michael Wilson",
        "email": "michael@example.com",
        "phoneNumber": "+34 91 123 45 67",
        "insurance": "Yes",
        "location": "Denmark",
        "treatmentType": "Gastroenterology",
        "doctorName": "Dr. Olivia",
        "gender": "Male"
    },
    {
        "image": user7,
        "date": "16 Dec, 2023",
        "name": "Sarah Moore",
        "email": "sarah@example.com",
        "phoneNumber": "+81 3 1234 5678",
        "insurance": "Yes",
        "location": "Sudan",
        "treatmentType": "Oncology",
        "doctorName": "Dr. David",
        "gender": "Female"
    },
    {
        "image": user8,
        "date": "06 Sep, 2024",
        "name": "James Taylor",
        "email": "james@example.com",
        "phoneNumber": "+91 22 1234 5678",
        "insurance": "No",
        "location": "Spain",
        "treatmentType": "Urology",
        "doctorName": "Dr. Sophia",
        "gender": "Male"
    },
    {
        "image": user9,
        "date": "21 Nov, 2023",
        "name": "Laura Anderson",
        "email": "laura@example.com",
        "phoneNumber": "+7 495 123-45-67",
        "insurance": "Yes",
        "location": "Germany",
        "treatmentType": "General Medicine",
        "doctorName": "Dr. William",
        "gender": "Female"
    },
    {
        "image": user10,
        "date": "10 March, 2024",
        "name": "David Thomas",
        "email": "david@example.com",
        "phoneNumber": "+55 11 1234-5678",
        "insurance": "No",
        "location": "Israel",
        "treatmentType": "Cardiology",
        "doctorName": "Dr. Charlotte",
        "gender": "Male"
    },
    {
        "image": user11,
        "date": "17 March, 2024",
        "name": "Jessica Lee",
        "email": "jessica@example.com",
        "phoneNumber": "+27 11 123 4567",
        "insurance": "No",
        "location": "Denmark",
        "treatmentType": "Dermatology",
        "doctorName": "Dr. Henry",
        "gender": "Female"
    },
    {
        "image": user12,
        "date": "27 Feb, 2024",
        "name": "Daniel Martin",
        "email": "daniel@example.com",
        "phoneNumber": "+65 6 1234 567",
        "insurance": "Yes",
        "location": "Russia",
        "treatmentType": "Neurology",
        "doctorName": "Dr. Mia",
        "gender": "Male"
    },
    {
        "image": user13,
        "date": "22 June, 2024",
        "name": "Sophia Harris",
        "email": "sophia@example.com",
        "phoneNumber": "+39 06 123 4567",
        "insurance": "No",
        "location": "Mexico",
        "treatmentType": "Orthopedics",
        "doctorName": "Dr. Benjamin",
        "gender": "Female"
    },
    {
        "image": user14,
        "date": "19 June, 2024",
        "name": "Matthew Clark",
        "email": "matthew@example.com",
        "phoneNumber": "+52 55 1234 5678",
        "insurance": "Yes",
        "location": "Namibia",
        "treatmentType": "Pediatrics",
        "doctorName": "Dr. Ava",
        "gender": "Male"
    },
    {
        "image": user15,
        "date": "21 June, 2024",
        "name": "Olivia Lewis",
        "email": "olivia@example.com",
        "phoneNumber": "+86 10 1234 5678",
        "insurance": "Yes",
        "location": "Brazil",
        "treatmentType": "Gastroenterology",
        "doctorName": "Dr. Jackson",
        "gender": "Female"
    },
    {
        "image": user16,
        "date": "14 June, 2024",
        "name": "Andrew Walker",
        "email": "andrew@example.com",
        "phoneNumber": "+31 20 123 4567",
        "insurance": "Yes",
        "location": "Brazil",
        "treatmentType": "Oncology",
        "doctorName": "Dr. Harper",
        "gender": "Male"
    },
    {
        "image": user17,
        "date": "14 July, 2024",
        "name": "Amelia Hall",
        "email": "amelia@example.com",
        "phoneNumber": "+46 8 123 4567",
        "insurance": "No",
        "location": "Poland",
        "treatmentType": "Urology",
        "doctorName": "Dr. Ethan",
        "gender": "Female"
    },
    {
        "image": user18,
        "date": "08 July, 2024",
        "name": "William Allen",
        "email": "william@example.com",
        "phoneNumber": "+64 9 123 4567",
        "insurance": "No",
        "location": "Russia",
        "treatmentType": "General Medicine",
        "doctorName": "Dr. Evelyn",
        "gender": "Male"
    },
    {
        "image": user19,
        "date": "13 July, 2024",
        "name": "Mia Young",
        "email": "young@example.com",
        "phoneNumber": "+45 12 34 56 78",
        "insurance": "Yes",
        "location": "Serbia",
        "treatmentType": "Cardiology",
        "doctorName": "Dr. Jack",
        "gender": "Female"
    },
    {
        "image": user20,
        "date": "25 July, 2024",
        "name": "Henry King",
        "email": "henry@example.com",
        "phoneNumber": "+41 21 123 45 67",
        "insurance": "Yes",
        "location": "Argentina",
        "treatmentType": "Dermatology",
        "doctorName": "Dr. Ella",
        "gender": "Male"
    },
    {
        "image": user21,
        "date": "02 Aug, 2024",
        "name": "Charlotte Wright",
        "email": "charlotte@example.com",
        "phoneNumber": "+1 604 123 4567",
        "insurance": "Yes",
        "location": "Malaysia",
        "treatmentType": "Neurology",
        "doctorName": "Dr. Logan",
        "gender": "Female"
    },
    {
        "image": user22,
        "date": "06 Aug, 2024",
        "name": "Benjamin Scott",
        "email": "scott@example.com",
        "phoneNumber": "+61 7 1234 5678",
        "insurance": "No",
        "location": "Belgium",
        "treatmentType": "Orthopedics",
        "doctorName": "Dr. Grace",
        "gender": "Male"
    },
    {
        "image": user23,
        "date": "07 Aug, 2024",
        "name": "Ava Green",
        "email": "ava@example.com",
        "phoneNumber": "+81 50 1234 5678",
        "insurance": "No",
        "location": "Norway",
        "treatmentType": "Pediatrics",
        "doctorName": "Dr. Lucas",
        "gender": "Female"
    },
    {
        "image": user24,
        "date": "11 Aug, 2024",
        "name": "Mason Baker",
        "email": "baker@example.com",
        "phoneNumber": "+86 20 1234 5678",
        "insurance": "No",
        "location": "Belgium",
        "treatmentType": "Gastroenterology",
        "doctorName": "Dr. Zoey",
        "gender": "Male"
    },
    {
        "image": user25,
        "date": "07 Feb, 2024",
        "name": "Isabella Nelson",
        "email": "nelson@example.com",
        "phoneNumber": "+55 21 1234-5678",
        "insurance": "No",
        "location": "Poland",
        "treatmentType": "Oncology",
        "doctorName": "Dr. Mason",
        "gender": "Female"
    },
    {
        "image": user26,
        "date": "11 May, 2024",
        "name": "Elijah Carter",
        "email": "carter@example.com",
        "phoneNumber": "+49 40 123456",
        "insurance": "No",
        "location": "Romania",
        "treatmentType": "Urology",
        "doctorName": "Dr. Lily",
        "gender": "Male"
    }
]
export default patientsData