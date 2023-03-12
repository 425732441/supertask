export default {
	getProjectsFromStorage() {
		const projects = uni.getStorageSync("projects");
		return projects;
	},
	setProjectInfoToStorage(projects) {
		uni.setStorageSync("projects", projects);
	}
}

