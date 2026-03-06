import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../lib/axios";

function VisitorDetailPage() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [visitor, setVisitor] = useState(null);

  const fetchVisitor = async () => {

    const res = await api.get(`/visitors/${id}`);
    setVisitor(res.data);

  };

  useEffect(() => {
    fetchVisitor();
  }, []);

  if (!visitor) return <p className="text-center mt-10">Loading...</p>;

  return (

    <div className="flex flex-col items-center mt-10">

      <button
        onClick={() => navigate(-1)}
        className="btn btn-outline btn-sm mb-4"
      >
        Back
      </button>

      <div className="card bg-base-100 shadow-xl p-6 w-96 space-y-3">

        <h2 className="text-2xl font-bold">
          {visitor.name}
        </h2>

        <p><b>Phone:</b> {visitor.phone}</p>

        <p><b>Email:</b> {visitor.email}</p>

        <p><b>Purpose:</b> {visitor.purpose}</p>

        <p><b>Person To Meet:</b> {visitor.personToMeet}</p>

        <p><b>ID Proof:</b> {visitor.idProofType}</p>

        <p><b>Status:</b> {visitor.status}</p>

        <p>
          <b>Check In:</b>{" "}
          {new Date(visitor.checkInTime).toLocaleString()}
        </p>

        {visitor.checkOutTime && (

          <p>
            <b>Check Out:</b>{" "}
            {new Date(visitor.checkOutTime).toLocaleString()}
          </p>

        )}

      </div>

    </div>

  );

}

export default VisitorDetailPage;