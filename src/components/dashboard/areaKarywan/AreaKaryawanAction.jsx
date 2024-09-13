import { useEffect, useRef, useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const AreaKaryawanAction = ({ id }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  const handleDelete = async () => {
    Swal.fire({
      title: "Apakah anda yakin ingin menghapus data ini?",
      text: "Data yang telah dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Tidak, Batalkan",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`http://localhost:3001/api/delete/${id}`, {
            method: "DELETE",
          });

          if (!response.ok) {
            throw new Error("Respons jaringan tidak baik");
          }

          const data = await response.json();
          if (data.success) {
            Swal.fire({
              title: "Berhasil Menghapus!",
              text: "Data Anda telah dihapus.",
              icon: "success",
              confirmButtonText: "OK",
            }).then(() => {
              window.location.reload(); // Pindahkan reload ke sini setelah alert sukses ditutup
            });
          }
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: `Terjadi kesalahan: ${error.message}`,
            icon: "error",
          });
        }
      }
    });
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <button
        type="button"
        className="action-dropdown-btn"
        onClick={handleDropdown}
      >
        <HiDotsHorizontal size={18} />
        {showDropdown && (
          <div className="action-dropdown-menu" ref={dropdownRef}>
            <ul className="dropdown-menu-list">
              <li className="dropdown-menu-item">
                <Link to="/view" className="dropdown-menu-link">
                  View
                </Link>
              </li>
              <li className="dropdown-menu-item">
                <Link to={`/admin/karyawan/edit/${id}`} className="dropdown-menu-link">
                  Edit
                </Link>
              </li>
              <li className="dropdown-menu-item">
                <Link onClick={handleDelete} className="dropdown-menu-link">
                  Delete
                </Link>
              </li>
            </ul>
          </div>
        )}
      </button>
    </>
  );
};

export default AreaKaryawanAction;
