export default {
	getProjectsFromStorage() {
		return uni.getStorageSync("projects") ? uni.getStorageSync("projects") : [];
	},
	setProjectsToStorage(projects) {
		console.log('save projects to storage', projects);
		uni.setStorageSync("projects", projects);
	}

}

