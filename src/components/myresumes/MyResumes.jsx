import MyResume from "./myresume/MyResume";
export default function MyResumes({ resumes }) {
    if (!resumes || resumes.length === 0) {
        return <div>No resumes to display</div>;
    }

    const showResumes = resumes.map(item => (
        <MyResume
            item={item}
            key={item.id}
        />
    ));
    return <div>{showResumes}</div>;
}
