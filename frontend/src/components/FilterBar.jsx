import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasksThunk } from '../features/taskSlice';
import Button from './Button';
import { TASK_STATUSES } from '../utils/constants';
import AssignedToDropdown from './task/AssignedToDropdown';

const FilterBar = () => {
    const dispatch = useDispatch();
    const [filters, setFilters] = useState({
        status: '',
        assigned_to: '',
    });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleApplyFilters = () => {
        const activeFilters = {};
        if (filters.status) activeFilters.status = filters.status;
        if (filters.assigned_to) activeFilters.assigned_to = parseInt(filters.assigned_to, 10);
        
        dispatch(fetchTasksThunk(activeFilters));
    };
    
    const handleClearFilters = () => {
        setFilters({ status: '', assigned_to: '' });
        dispatch(fetchTasksThunk({}));
    };

    return (
        <div className="flex space-x-4 p-4 rounded-lg bg-white shadow-md mb-6">
            <div className="flex-1">
                <label htmlFor="status-filter" className="sr-only">Status</label>
                <select
                    id="status-filter"
                    name="status"
                    value={filters.status}
                    onChange={handleFilterChange}
                    className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    <option value="">Filter by Status</option>
                    {TASK_STATUSES.map((option) => (
                        <option key={option} value={option}>
                            {option.replace('_', ' ')}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex-1">
                <label htmlFor="assigned-to-filter" className="sr-only">Assigned To</label>
                <AssignedToDropdown
                    name="assigned_to"
                    value={filters.assigned_to}
                    onChange={handleFilterChange}
                    className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>
            
            <Button onClick={handleApplyFilters} text="Apply" className='bg-blue-500 hover:bg-blue-600 text-white p-2 text-sm rounded-lg'/>
            <Button onClick={handleClearFilters} text="Clear" className="bg-white border text-black  hover:bg-gray-500"/>
        </div>
    );
};
export default FilterBar;