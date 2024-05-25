"use client";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// import { acceptApply, declineApply } from "@/app/store/slices/applySlice";

export default function Apply({ item }) {
  const dispatch = useDispatch();

  const age = getAgeFromBirthday(item.resume.birthday);

  return (
    <div className="card">
      <Link className="link" href={`/resumes/${item.resume.id}`}>
        {item.resume.position}
      </Link>
      <p>
        {item.resume.first_name} {item.resume.last_name}, Возраст: {age}
      </p>
      <h3>
        {item.resume.salary} {item.resume.salary_type}
      </h3>

      <div className="flex">
        {item.status !== "INVITATION" && (
          <button
            className="button button-primary mr4"
            onClick={() => dispatch(acceptApply(item.id))}
          >
            Invite
          </button>
        )}
        {item.status !== "DECLINED" && (
          <button
            className="button button-secondary"
            onClick={() => dispatch(declineApply(item.id))}
          >
            Reject
          </button>
        )}
      </div>
    </div>
  );
}
