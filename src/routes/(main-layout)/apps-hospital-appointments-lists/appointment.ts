interface Appointment {
  date: string;
  time: string;
  patientName: string;
  doctor: string;
  treatmentType: string;
  status: string;
  image?: string; // Optional image property
}

export const appointmentsData: Appointment[]  = [
  {
    date: '07 June, 2024',
    time: '02:00PM - 03:00PM',
    patientName: 'Sarah White',
    doctor: 'Dr. Michael Johnson',
    treatmentType: 'Routine check-up',
    status: 'Pending'
  },
  {
    image: '/assets/images/avatar/user-14.png',
    date: '08 June, 2024',
    time: '03:00PM - 04:00PM',
    patientName: 'Daniel Adams',
    doctor: 'Dr. Sarah Evans',
    treatmentType: 'Skin condition evaluation',
    status: 'New'
  },
  {
    date: '09 June, 2024',
    time: '11:30AM - 12:30PM',
    patientName: 'Olivia Lewis',
    doctor: 'Dr. Sarah Evans',
    treatmentType: 'Vision check-up',
    status: 'New'
  },
  {
    date: '10 June, 2024',
    time: '10:00AM - 11:00AM',
    patientName: 'James Brown',
    doctor: 'Dr. Emily Carter',
    treatmentType: 'Dental cleaning',
    status: 'Pending'
  },
  {
    image: '/assets/images/avatar/user-18.png',
    date: '11 June, 2024',
    time: '01:00PM - 02:00PM',
    patientName: 'Linda Taylor',
    doctor: 'Dr. Robert Harris',
    treatmentType: 'Cardiology consultation',
    status: 'Confirmed'
  },
  {
    image: '/assets/images/avatar/user-17.png',
    date: '12 June, 2024',
    time: '09:00AM - 10:00AM',
    patientName: 'Sophia Martinez',
    doctor: 'Dr. Michael Johnson',
    treatmentType: 'Blood test',
    status: 'Completed'
  },
  {
    date: '13 June, 2024',
    time: '11:00AM - 12:00PM',
    patientName: 'Liam Anderson',
    doctor: 'Dr. Sarah Evans',
    treatmentType: 'Skin biopsy',
    status: 'Pending'
  },
  {
    image: '/assets/images/avatar/user-20.png',
    date: '14 June, 2024',
    time: '02:00PM - 03:00PM',
    patientName: 'Emma Wilson',
    doctor: 'Dr. Emily Carter',
    treatmentType: 'Orthopedic consultation',
    status: 'Confirmed'
  },
  {
    date: '15 June, 2024',
    time: '01:00PM - 02:00PM',
    patientName: 'Noah Davis',
    doctor: 'Dr. Robert Harris',
    treatmentType: 'Heart check-up',
    status: 'New'
  },
  {
    date: '16 June, 2024',
    time: '03:00PM - 04:00PM',
    patientName: 'Ava Johnson',
    doctor: 'Dr. Michael Johnson',
    treatmentType: 'Physical therapy',
    status: 'Pending'
  },
  {
    date: '17 June, 2024',
    time: '10:30AM - 11:30AM',
    patientName: 'William Moore',
    doctor: 'Dr. Sarah Evans',
    treatmentType: 'Allergy test',
    status: 'Completed'
  },
  {
    image: '/assets/images/avatar/user-15.png',
    date: '18 June, 2024',
    time: '11:00AM - 12:00PM',
    patientName: 'Mia Taylor',
    doctor: 'Dr. Emily Carter',
    treatmentType: 'Dental filling',
    status: 'Pending'
  },
  {
    date: '19 June, 2024',
    time: '01:00PM - 02:00PM',
    patientName: 'Ethan Martinez',
    doctor: 'Dr. Robert Harris',
    treatmentType: 'Kidney function test',
    status: 'Confirmed'
  },
  {
    image: '/assets/images/avatar/user-23.png',
    date: '20 June, 2024',
    time: '02:30PM - 03:30PM',
    patientName: 'Isabella Hernandez',
    doctor: 'Dr. Michael Johnson',
    treatmentType: 'Routine check-up',
    status: 'Pending'
  },
  {
    image: '/assets/images/avatar/user-13.png',
    date: '21 June, 2024',
    time: '09:00AM - 10:00AM',
    patientName: 'Jackson Lee',
    doctor: 'Dr. Sarah Evans',
    treatmentType: 'Chest X-ray',
    status: 'New'
  },
  {
    date: '22 June, 2024',
    time: '10:00AM - 11:00AM',
    patientName: 'Aiden Clark',
    doctor: 'Dr. Emily Carter',
    treatmentType: 'Orthopedic follow-up',
    status: 'Pending'
  },
  {
    date: '23 June, 2024',
    time: '11:00AM - 12:00PM',
    patientName: 'Grace Martinez',
    doctor: 'Dr. Robert Harris',
    treatmentType: 'Cardiac stress test',
    status: 'Confirmed'
  },
  {
    date: '24 June, 2024',
    time: '12:00PM - 01:00PM',
    patientName: 'Lucas Johnson',
    doctor: 'Dr. Michael Johnson',
    treatmentType: 'Routine check-up',
    status: 'Pending'
  },
  {
    date: '25 June, 2024',
    time: '01:00PM - 02:00PM',
    patientName: 'Lily Davis',
    doctor: 'Dr. Sarah Evans',
    treatmentType: 'Allergy consultation',
    status: 'New'
  },
  {
    date: '26 June, 2024',
    time: '02:00PM - 03:00PM',
    patientName: 'Mason Brown',
    doctor: 'Dr. Emily Carter',
    treatmentType: 'Dental extraction',
    status: 'Confirmed'
  },
  {
    date: '27 June, 2024',
    time: '03:00PM - 04:00PM',
    patientName: 'Zoe Wilson',
    doctor: 'Dr. Robert Harris',
    treatmentType: 'Neurological examination',
    status: 'Pending'
  }
];
