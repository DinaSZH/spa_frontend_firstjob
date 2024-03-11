import MyResume from "./myresume/MyResume";
export default function MyResumes ({resumes}) {
    if (!resumes) {
        return <div>No resumes to display</div>;
    }
    
    const showResumes = resumes.map(item => (<MyResume 
        item={item}
        key={item.id}
        />));
    return(<div>
        {showResumes}
    </div>)
}