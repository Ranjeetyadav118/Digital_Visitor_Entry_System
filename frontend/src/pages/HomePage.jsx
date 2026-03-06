import { useEffect, useState } from "react";
import api from "../lib/axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function HomePage() {

  const [visitors, setVisitors] = useState([]);
  const [dateFilter, setDateFilter] = useState("");
  const [idProofFilter, setIdProofFilter] = useState("");

  const fetchVisitors = async () => {

    try {

      const res = await api.get("/visitors");
      setVisitors(res.data);

    } catch {

      toast.error("Failed to fetch visitors");

    }

  };

  useEffect(() => {
    fetchVisitors();
  }, []);

  const handleDelete = async (id) => {

    if (!window.confirm("Delete visitor?")) return;

    try {

      await api.delete(`/visitors/${id}`);

      toast.success("Visitor deleted");

      fetchVisitors();

    } catch {

      toast.error("Delete failed");

    }

  };

  // FILTER LOGIC

  const filteredVisitors = visitors.filter((visitor) => {

    const matchDate = dateFilter
      ? new Date(visitor.checkInTime).toISOString().slice(0,10) === dateFilter
      : true;

    const matchIdProof = idProofFilter
      ? visitor.idProofType === idProofFilter
      : true;

    return matchDate && matchIdProof;

  });

  const resetFilters = () => {

    setDateFilter("");
    setIdProofFilter("");

  };

  return (

    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Visitor Dashboard
      </h1>

      {/* FILTERS */}

      <div className="flex flex-wrap gap-4 mb-6">

        <input
          type="date"
          className="input input-bordered"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />

        <select
          className="select select-bordered"
          value={idProofFilter}
          onChange={(e) => setIdProofFilter(e.target.value)}
        >

          <option value="">All ID Proofs</option>
          <option value="Aadhaar">Aadhaar</option>
          <option value="PAN">PAN</option>
          <option value="Driving License">Driving License</option>
          <option value="Passport">Passport</option>

        </select>

        <button
          onClick={resetFilters}
          className="btn btn-outline"
        >
          Reset
        </button>

      </div>

      {/* VISITOR CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {filteredVisitors.map((visitor) => (

          <div
            key={visitor._id}
            className="card bg-base-100 border border-base-300 shadow-xl p-6"
          >

            <h2 className="text-xl font-bold">
              {visitor.name}
            </h2>

            <p> {visitor.phone}</p>

            <p> {visitor.purpose}</p>

            <p> Meeting: {visitor.personToMeet}</p>

            <p>ID: {visitor.idProofType}</p>

            <p className="text-sm text-gray-500">

              Check-in: {new Date(visitor.checkInTime).toLocaleString()}

            </p>

            <div className="mt-2">

              {visitor.status === "Active" ? (

                <span className="badge badge-success">
                  Active
                </span>

              ) : (

                <span className="badge badge-neutral">
                  Completed
                </span>

              )}

            </div>

            <div className="flex gap-2 mt-4">

              <Link
                to={`/visitors/${visitor._id}`}
                className="btn btn-sm btn-primary"
              >
                View
              </Link>

              <Link
                to={`/edit/${visitor._id}`}
                className="btn btn-sm btn-warning"
              >
                Edit
              </Link>

              <button
                onClick={() => handleDelete(visitor._id)}
                className="btn btn-sm btn-error"
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}

export default HomePage;