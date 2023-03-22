export default {
	getProjectsFromStorage() {
		return !!uni.getStorageSync("projects") ? uni.getStorageSync("projects") : [];
	},
	setProjectsToStorage(projects) {
		uni.setStorageSync("projects", projects);
	}

}

