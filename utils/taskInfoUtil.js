let taskStatusMap = {
	notstart: { color: '#e4e4e4', text: '未开始' },
	inprogress: { color: '#95daff', text: '进行中' },
	finished: { color: '#c0ffc8', text: '已完成' }
}
let taskPriorityMap = {
	"0": "高",
	"1": "中",
	"2": "低"
}
export const taskInfoUtil = {
	taskStatusMap,
	getTaskStatusText: (status) => {
		return taskStatusMap[status].text;
	},
	getTaskPriorityText: (priority) => {
		return taskPriorityMap[priority];
	}
};

