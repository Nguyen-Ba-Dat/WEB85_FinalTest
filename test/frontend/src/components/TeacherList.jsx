import React from 'react';

const TeacherList = ({ teachers }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Mã giáo viên</th>
                    <th>Tên</th>
                    <th>Email</th>
                    <th>Số điện thoại</th>
                </tr>
            </thead>
            <tbody>
                {teachers.map((teacher) => (
                    <tr key={teacher._id}>
                        <td>{teacher.code}</td>
                        <td>{teacher.userId.name}</td>
                        <td>{teacher.userId.email}</td>
                        <td>{teacher.userId.phoneNumber}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TeacherList;
