import { getFacultyBySlug, getSortedFaculty } from '../../models/faculty/faculty.js';


// Faculty list
const facultyListPage = async (req, res, next) => {
    try {
        // Validate sort option
        const validSortOptions = ['name', 'department', 'title'];
        const sortBy = validSortOptions.includes(req.query.sort) 
            ? req.query.sort 
            : 'name';  
        
        const facultyList = await getSortedFaculty(sortBy);
        
        res.render('faculty/list', {
            title: 'Faculty Directory',
            faculty: facultyList,
            currentSort: sortBy
        });
    } catch (error) {
        next(error);
    }
};

// Faculty detail
const facultyDetailPage = async (req, res, next) => {
    const facultySlug = req.params.facultySlug;
    const facultyMember = await getFacultyBySlug(facultySlug);
    if (Object.keys(facultyMember).length === 0) {
        const err = new Error(`Faculty member ${facultySlug} not found`);
        err.status = 404;
        return next(err);
    }
    res.render('faculty/detail', {
        title: `${facultyMember.name} - Faculty Profile`,
        faculty: facultyMember
    });
};

export { facultyListPage, facultyDetailPage };
