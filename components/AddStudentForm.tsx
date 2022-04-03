import axios from "axios";
import clsx from "clsx";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { Student } from "../model";
import styles from "../styles/comments.module.css";

export const AddStudentForm = () => {
	const [newStudent, setNewStudent] = useState<Student>({
		id: "",
		"first-name": "",
		"last-name": "",
		address: "",
	});

	const addCommentMutation = useMutation((student: Student) => {
		return axios.post("/api/post/create-student", {
			...student,
		});
	});

	const handleAddNewStudent = (e: React.SyntheticEvent<HTMLFormElement>) => {
		e.preventDefault();
		addCommentMutation.mutate(newStudent);
	};

	const onNewStudentInputChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
	};

	return (
		<React.Fragment>
			<form
				className="flex items-center gap-3 mt-9"
				onSubmit={handleAddNewStudent}
			>
				<table
					className={clsx(
						"table-auto",
						styles["comments-table"],
						"max-w-[600px] mt-9"
					)}
				>
					<thead>
						<tr>
							<th>Student ID</th>
							<th>First Name</th>
							<th>Last Name</th>
							<th>Address</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								<input
									type="text"
									name="id"
									value={String(newStudent.id)}
									onChange={(e) => onNewStudentInputChange(e)}
								/>
							</td>
							<td>
								<input
									type="text"
									name="first-name"
									value={String(newStudent["first-name"])}
									onChange={(e) => onNewStudentInputChange(e)}
								/>
							</td>
							<td>
								<input
									type="text"
									name="last-name"
									value={String(newStudent["last-name"])}
									onChange={(e) => onNewStudentInputChange(e)}
								/>
							</td>
							<td>
								<input
									type="text"
									name="address"
									value={String(newStudent.address)}
									onChange={(e) => onNewStudentInputChange(e)}
								/>
							</td>
							<td>
								<button
									disabled={!newStudent.id}
									className="px-4 py-2 font-semibold disabled:bg-slate-300 disabled:cursor-not-allowed text-sm bg-cyan-500 text-white rounded-full shadow-sm whitespace-nowrap"
								>
									Add Student
								</button>
							</td>
						</tr>
					</tbody>
				</table>
			</form>

			{addCommentMutation.isError ? (
				<div>An error occurred: {addCommentMutation.error}</div>
			) : null}

			{addCommentMutation.isSuccess ? <div>Student Added!</div> : null}
		</React.Fragment>
	);
};
