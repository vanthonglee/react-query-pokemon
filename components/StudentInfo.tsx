import axios from "axios";
import clsx from "clsx";
import { useMutation } from "react-query";
import styles from "../styles/comments.module.css";

interface StudentInfoProps {
	isLoading: boolean;
	isError: boolean;
	error: unknown;
	isSuccess: boolean;
	data: any;
	isFetching: boolean;
	refetch: any;
}

export const StudentInfo = ({
	isLoading,
	isError,
	error,
	isSuccess,
	data,
	isFetching,
	refetch,
}: StudentInfoProps) => {
	const deleteCommentMutation = useMutation((studentId: string) => {
		return axios.delete("/api/delete/delete-student?id=" + studentId);
	});

	if (isError) {
		return <div className="search-message"> {error} </div>;
	}

	if (isLoading || isFetching) {
		return <div className="search-message"> Loading... </div>;
	}

	if (!(isLoading || isFetching) && !data?.student) {
		return <div className="search-message"> Data Not Found!</div>;
	}

	if (isSuccess) {
		return (
			<>
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
							<td>{data.student.student_id}</td>
							<td>{data.student.first_name}</td>
							<td>{data.student.last_name}</td>
							<td>{data.student.address}</td>
							<td>
								{" "}
								<button
									onClick={() => {
										deleteCommentMutation.mutate(
											data.student.student_id
										);
										refetch();
									}}
									className="px-4 py-2 font-semibold text-sm bg-red-600 text-white rounded-full shadow-sm"
								>
									Delete
								</button>
							</td>
						</tr>
					</tbody>
				</table>
			</>
		);
	}

	return <></>;
};
