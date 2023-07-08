import NavBar from '@/components/NavBar';
import Select from 'react-select';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { post_job } from '@/Services/job';
import { useRouter } from 'next/router';

export default function PostAJob() {
    const user = useSelector((state) => state.User.userData);
    const router = useRouter();

    const [page, setPage] = useState(1);

    // Page 1 form fields
    const [title, setTitle] = useState('');
    const [salary, setSalary] = useState('');
    const [email, setEmail] = useState(user?.email || '');
    const [company, setCompany] = useState('');
    const [error, setError] = useState({ title: '', salary: '', email: '', company: '' });

    // Page 2 form fields
    const [description, setDescription] = useState('');
    const [jobCategory, setJobCategory] = useState(null);
    const [jobType, setJobType] = useState(null);
    const [jobExperience, setJobExperience] = useState('');
    const [jobVacancy, setJobVacancy] = useState('');
    const [jobDeadline, setJobDeadline] = useState('');
    const [error2, setError2] = useState({
        description: '',
        jobCategory: '',
        jobType: '',
        jobExperience: '',
        jobVacancy: '',
        jobDeadline: '',
    });

    useEffect(() => {
        if (page === 1) {
            setError({
                title: '',
                salary: '',
                email: '',
                company: '',
            });
        } else if (page === 2) {
            setError2({
                description: '',
                jobCategory: '',
                jobType: '',
                jobExperience: '',
                jobVacancy: '',
                jobDeadline: '',
            });
        }
    }, [page]);

    const handleNextPage = () => {
        setPage(2);
    };

    const handlePreviousPage = () => {
        setPage(1);
    };

    const handleNumberInputChange = (e, setState) => {
        const { value } = e.target;
        const regex = /^[0-9\b]+$/;
        if (value === '' || regex.test(value)) {
            setState(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (page === 1) {
            if (!title) {
                setError({ ...error, title: 'Title field is required' });
                return;
            }

            if (!salary) {
                setError({ ...error, salary: 'Salary field is required' });
                return;
            }

            if (!email) {
                setError({ ...error, email: 'Email field is required' });
                return;
            }

            if (!company) {
                setError({ ...error, company: 'Company field is required' });
                return;
            }
        } else if (page === 2) {
            if (!description) {
                setError2({ ...error2, description: 'Description field is required' });
                return;
            }

            if (!jobCategory) {
                setError2({ ...error2, jobCategory: 'Job category field is required' });
                return;
            }

            if (!jobType) {
                setError2({ ...error2, jobType: 'Job type field is required' });
                return;
            }

            if (!jobExperience) {
                setError2({ ...error2, jobExperience: 'Job experience field is required' });
                return;
            }

            if (!jobVacancy) {
                setError2({ ...error2, jobVacancy: 'Job vacancy field is required' });
                return;
            }

            if (!jobDeadline) {
                setError2({ ...error2, jobDeadline: 'Job deadline field is required' });
                return;
            }

            if (user == null) {
                toast.error('Please login first');
                router.push('/auth/login');
                return;
            }

            const formData = {
                user: user?._id,
                title,
                salary,
                email,
                company,
                description,
                job_category: jobCategory.value,
                job_type: jobType.value,
                job_experience: jobExperience,
                job_vacancy: jobVacancy,
                job_deadline: jobDeadline,
            };

            const res = await post_job(formData);
            if (res.success) {
                toast.success(res.message);
                setTimeout(() => {
                    router.push('/frontend/postAJob');
                }, 1000);
            } else {
                toast.error(res.message);
            }
        }

        // Clear form fields after successful submission
        setTitle('');
        setSalary('');
        setEmail(user?.email || '');
        setCompany('');
        setDescription('');
        setJobCategory(null);
        setJobType(null);
        setJobExperience('');
        setJobVacancy('');
        setJobDeadline('');
    };

    const options = [
        { value: 'fulltime', label: 'Full Time' },
        { value: 'parttime', label: 'Part Time' },
        { value: 'internship', label: 'Internship' },
        { value: 'contract', label: 'Contract' },
    ];

    const Category = [
        { value: 'Software', label: 'Software' },
        { value: 'Marketing', label: 'Marketing' },
        { value: 'UI-UX Design', label: 'UI-UX Design' },
    ];

    return (
        <>
            <NavBar />
            <div className="w-full py-20 flex items-center justify-center flex-col">
                <h1 className="text-xl mt-4 uppercase tracking-widest border-b-2 border-b-indigo-600 py-2 font-semibold mb-8 md:text-2xl lg:text-4xl">Enter Job Details</h1>
                {page === 1 && (
                    <form onSubmit={handleSubmit} className="sm:w-1/2 w-full px-4 mx-4 h-full">
                        {/* Page 1 form fields */}
                        <div className="w-full mb-4 flex flex-col items-start justify-center">
                            <label htmlFor="title" className="mb-1 text-base font-semibold">Title:</label>
                            <input
                                onChange={(e) => setTitle(e.target.value)}
                                type="text"
                                id="title"
                                className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
                                placeholder="Enter the title of the job"
                                value={title}
                            />
                            {error.title && <p className="text-sm text-red-500">{error.title}</p>}
                        </div>
                        {/* Rest of the page 1 form fields */}
                        <div className="w-full mb-4 flex flex-col items-start justify-center">
                            <label htmlFor="salary" className="mb-1 text-base font-semibold">Salary:</label>
                            <input
                                onChange={(e) => handleNumberInputChange(e, setSalary)}
                                type="text"
                                id="salary"
                                className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
                                placeholder="Enter the salary for this job"
                                value={salary}
                            />
                            {error.salary && <p className="text-sm text-red-500">{error.salary}</p>}
                        </div>
                        <div className="w-full mb-4 flex flex-col items-start justify-center">
                            <label htmlFor="email" className="mb-1 text-base font-semibold">Email:</label>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                value={email}
                                id="email"
                                className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
                                placeholder="Enter the email to be contacted for this job"
                            />
                            {error.email && <p className="text-sm text-red-500">{error.email}</p>}
                        </div>
                        <div className="w-full mb-4 flex flex-col items-start justify-center">
                            <label htmlFor="company" className="mb-1 text-base font-semibold">Company:</label>
                            <input
                                onChange={(e) => setCompany(e.target.value)}
                                type="text"
                                id="company"
                                className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
                                placeholder="Enter the company of the job"
                                value={company}
                            />
                            {error.company && <p className="text-sm text-red-500">{error.company}</p>}
                        </div>
                        <button type="button" onClick={handleNextPage} className="w-full py-2 rounded bg-indigo-600 text-white font-semibold tracking-widest">Next</button>
                    </form>
                )}
                {page === 2 && (
                    <form onSubmit={handleSubmit} className="sm:w-1/2 w-full px-4 mx-4 h-full">
                        {/* Page 2 form fields */}
                        <div className="w-full mb-4 flex flex-col items-start justify-center">
                            <label htmlFor="description" className="mb-1 text-base font-semibold">Description:</label>
                            <textarea
                                onChange={(e) => setDescription(e.target.value)}
                                type="text"
                                id="description"
                                className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
                                placeholder="Enter the description of the job"
                                value={description}
                            />
                            {error2.description && <p className="text-sm text-red-500">{error2.description}</p>}
                        </div>
                        <div className="w-full mb-4 flex flex-col items-start justify-center">
                            <label htmlFor="jobCategory" className="mb-1 text-base font-semibold">Job Category:</label>
                            <Select
                                onChange={(selectedOption) => setJobCategory(selectedOption)}
                                id="jobCategory"
                                options={Category}
                                className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
                                placeholder="Select the category of the job"
                                value={jobCategory}
                            />
                            {error2.jobCategory && <p className="text-sm text-red-500">{error2.jobCategory}</p>}
                        </div>
                        <div className="w-full mb-4 flex flex-col items-start justify-center">
                            <label htmlFor="jobType" className="mb-1 text-base font-semibold">Job Type:</label>
                            <Select
                                onChange={(selectedOption) => setJobType(selectedOption)}
                                id="jobType"
                                options={options}
                                className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
                                placeholder="Select the type of the job"
                                value={jobType}
                            />
                            {error2.jobType && <p className="text-sm text-red-500">{error2.jobType}</p>}
                        </div>
                        <div className="w-full mb-4 flex flex-col items-start justify-center">
                            <label htmlFor="jobExperience" className="mb-1 text-base font-semibold">Job Experience:</label>
                            <input
                                onChange={(e) => handleNumberInputChange(e, setJobExperience)}
                                type="text"
                                id="jobExperience"
                                className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
                                placeholder="Enter the experience required for this job"
                                value={jobExperience}
                            />
                            {error2.jobExperience && <p className="text-sm text-red-500">{error2.jobExperience}</p>}
                        </div>
                        <div className="w-full mb-4 flex flex-col items-start justify-center">
                            <label htmlFor="jobVacancy" className="mb-1 text-base font-semibold">Job Vacancy:</label>
                            <input
                                onChange={(e) => handleNumberInputChange(e, setJobVacancy)}
                                type="text"
                                id="jobVacancy"
                                className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
                                placeholder="Enter the number of job vacancies"
                                value={jobVacancy}
                            />
                            {error2.jobVacancy && <p className="text-sm text-red-500">{error2.jobVacancy}</p>}
                        </div>
                        <div className="w-full mb-4 flex flex-col items-start justify-center">
                            <label htmlFor="jobDeadline" className="mb-1 text-base font-semibold">Job Deadline:</label>
                            <input
                                onChange={(e) => setJobDeadline(e.target.value)}
                                type="date"
                                id="jobDeadline"
                                className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
                                placeholder="Enter the deadline of the job"
                                min={new Date().toISOString().split('T')[0]}
                                value={jobDeadline}
                            />
                            {error2.jobDeadline && <p className="text-sm text-red-500">{error2.jobDeadline}</p>}
                        </div>
                        <button type="button" onClick={handlePreviousPage} className="w-full py-2 rounded bg-indigo-600 text-white font-semibold tracking-widest">Previous</button>
                        <button type="submit" className="w-full py-2 mt-5 rounded bg-indigo-600 text-white font-semibold tracking-widest">Submit</button>
                    </form>
                )}
            </div>
            <ToastContainer />
        </>
    );
}
