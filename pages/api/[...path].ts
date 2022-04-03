import type { NextApiRequest, NextApiResponse } from "next";
const https = require("https");
const httpsAgent = new https.Agent({ rejectUnauthorized: false });
const axios = require("axios");

// config : https://github.com/axios/axios#request-config
const axiosWrapperWithoutTLS = (config = {}) =>
	axios({ ...config, httpsAgent: httpsAgent })
		.then(function (response) {
			return response.data;
		})
		.catch(function (error) {
			console.log(error);
		});

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const url =
		"https://184.105.241.124:30004/api/23bc46b1-71f6-4ed5-8c54-816aa4f8c502/xuanlinhha/" +
		req.url.replace("/api/", "");

	switch (req.method) {
		case "GET":
			{
				let response = await axiosWrapperWithoutTLS({ url });
				res.status(200).json({
					...response.body.data,
				});
			}
			break;
		case "POST":
			{
				let response = await axiosWrapperWithoutTLS({
					url,
					method: "post",
					headers: { "Content-Type": "application/json" },
					data: req.body,
				});

				res.status(200).json({ ...response });
			}
			break;
		case "DELETE":
			{
				let response = await axiosWrapperWithoutTLS({
					url,
					method: "delete",
				});
				console.log(url);
				console.log(response);
				res.status(200).json({ ...response });
			}
			break;
	}
}
