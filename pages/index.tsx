import { useQuery, useMutation } from "react-query";
import { useState } from "react";
import axios from "axios";
import { AddStudentForm } from "../components/AddStudentForm";
import { StudentInfo } from "../components/StudentInfo";

export default function Comments() {
	const [searchText, setSearchText] = useState("");

	const handleSearchStudentById = () => {
		refetch();
	};

	const { isLoading, isError, error, isSuccess, data, isFetching, refetch } =
		useQuery(
			"student",
			async () => {
				const { data } = await axios.get(
					"/api/get/get-student?student-id=" + searchText
				);
				return data;
			},
			// To learn more useQuery API
			// https://react-query.tanstack.com/reference/useQuery
			{
				staleTime: 0,
				enabled: false,
			}
		);

	if (isError) {
		return <div className="search-message"> {error}</div>;
	}

	return (
		<div>
			<h1 className="text-2xl font-bold mt-8 text-center ">
				Tiny Student Management System
			</h1>

			<div className="flex flex-col justify-center items-center">
				<AddStudentForm />

				<div>
					<div className="flex items-center gap-3 mt-9">
						<input
							type="text"
							value={searchText}
							onChange={(e) => setSearchText(e.target.value)}
						/>
						<button
							onClick={handleSearchStudentById}
							className="px-4 py-2 font-semibold text-sm bg-cyan-500 text-white rounded-full shadow-sm whitespace-nowrap"
						>
							Search Student By ID
						</button>
					</div>
					<p className="text-sm italic text-gray-700">
						Student Ids: S0002,S0003,...
					</p>
				</div>

				<StudentInfo
					isLoading={isLoading}
					isError={isError}
					error={error}
					isSuccess={isSuccess}
					data={data}
					isFetching={isFetching}
					refetch={refetch}
				/>
			</div>
		</div>
	);
}
