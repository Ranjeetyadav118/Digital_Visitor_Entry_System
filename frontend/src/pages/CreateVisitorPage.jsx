import { useState, useEffect } from "react";
import api from "../lib/axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

function CreateVisitorPage() {

  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    purpose: "",
    personToMeet: "",
    idProofType: "",
    status: "Active"
  });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const fetchVisitor = async () => {

    const res = await api.get(`/visitors/${id}`);
    setForm(res.data);

  };

  useEffect(() => {

    if (id) {
      fetchVisitor();
    }

  }, [id]);

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (id) {

        await api.put(`/visitors/${id}`, form);
        toast.success("Visitor updated successfully");

      } else {

        await api.post("/visitors", form);
        toast.success("Visitor added successfully");

      }

      navigate("/");

    } catch {

      toast.error("Something went wrong");

    }

  };

  return (

    <div className="flex justify-center mt-10">

      <form
        onSubmit={handleSubmit}
        className="card bg-base-100 shadow-xl p-6 w-96 space-y-4"
      >

        <h2 className="text-xl font-bold text-center">
          {id ? "Edit Visitor" : "Add Visitor"}
        </h2>

        <input
          className="input input-bordered"
          name="name"
          placeholder="Visitor Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          className="input input-bordered"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />

        <input
          className="input input-bordered"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          className="input input-bordered"
          name="purpose"
          placeholder="Purpose of Visit"
          value={form.purpose}
          onChange={handleChange}
        />

        <input
          className="input input-bordered"
          name="personToMeet"
          placeholder="Person to Meet"
          value={form.personToMeet}
          onChange={handleChange}
        />

        <select
          name="idProofType"
          className="select select-bordered"
          value={form.idProofType}
          onChange={handleChange}
        >

          <option value="">Select ID Proof</option>
          <option value="Aadhaar">Aadhaar</option>
          <option value="PAN">PAN</option>
          <option value="Driving License">Driving License</option>
          <option value="Passport">Passport</option>

        </select>

        <select
          name="status"
          className="select select-bordered"
          value={form.status}
          onChange={handleChange}
        >

          <option value="Active">Active</option>
          <option value="Completed">Completed</option>

        </select>

        <button className="btn btn-primary">

          {id ? "Update Visitor" : "Add Visitor"}

        </button>

      </form>

    </div>

  );

}

export default CreateVisitorPage;