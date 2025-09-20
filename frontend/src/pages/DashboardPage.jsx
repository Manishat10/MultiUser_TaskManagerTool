import TaskList from "../components/task/TaskList";
import Header from "../layouts/Header"; 
function DashboardPage() {
    return (
        <div className="bg-gray-100 min-h-screen pt-16">
            <Header /> 
            <div className="max-w-6xl mx-auto p-4">
                <TaskList />
            </div>
        </div>
    );
}

export default DashboardPage;
