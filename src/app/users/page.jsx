"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Add_modal from "../components/modals/add_modal";
import Edit_modal from "../components/modals/edit_modal";
import Delete_modal from "../components/modals/delete_modal";
import Pagination from "../components/Pagination";
import Table from "../components/Table";

import {
  PlusIcon as PlusIconOutline,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  const fields = [
    {
      label: "",
      name: "userid",
      type: "hidden",
    },
    {
      label: "Email",
      name: "emailaddress",
      type: "text",
    },
    {
      label: "Name",
      name: "name",
      type: "text",
    },
    {
      label: "Password",
      name: "password",
      type: "password",
    },
  ];

  useEffect(() => {
    fetchUsers();
  }, [page, keyword]);

  const columns = [
    { Header: "Email", accessor: "emailaddress", className: "w-96 text-left" },
    { Header: "Name", accessor: "name", className: "w-96 text-left" },
  ];

  const fetchUsers = async () => {
    const response = await fetch(
      `/api/users?search=${keyword}&page=${page}&limit=${limit}`
    );
    const data = await response.json();
    setUsers(data.users);
    setTotal(data.total);
  };

  const handleSearch = () => {
    setPage(1);
    fetchUsers();
  };

  const totalPages = Math.ceil(total / limit);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const openEditModal = (user) => {
    setSelectedUser({ ...user, password: "" });
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (user) => {
    setSelectedUser({ ...user, password: "" });
    setIsDeleteModalOpen(true);
  };

  useEffect(() => {
    fetchUsers();
  }, [isEditModalOpen, isModalOpen, isDeleteModalOpen]);

  return (
    <>
      {isModalOpen && (
        <Add_modal
          open={isModalOpen}
          setOpen={setIsModalOpen}
          page={"users"}
          fields={fields}
        />
      )}
      {isEditModalOpen && selectedUser && (
        <Edit_modal
          open={isEditModalOpen}
          setOpen={setIsEditModalOpen}
          page={"users"}
          fields={fields}
          entityData={selectedUser}
        />
      )}
      {isDeleteModalOpen && selectedUser && (
        <Delete_modal
          open={isDeleteModalOpen}
          setOpen={setIsDeleteModalOpen}
          page={"users"}
          fields={fields}
          entityData={selectedUser}
        />
      )}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 pb-4 w-">
        <h1 className="text-2xl font-semibold text-gray-900 ">Users List</h1>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <div className="flex justify-between">
              <div className="w-64">
                <div className="flex">
                  <input
                    name="keyword"
                    id="keyword"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm mr-2 text-black"
                    placeholder="search user"
                    onChange={(e) => setKeyword(e.target.value)}
                  />

                  <button
                    type="button"
                    className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-2 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 "
                    onClick={handleSearch}
                  >
                    <MagnifyingGlassIcon className="h-5 w-5"></MagnifyingGlassIcon>
                  </button>
                </div>
              </div>
              <button
                type="button"
                className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-5 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={() => setIsModalOpen(true)}
              >
                Add User
              </button>
            </div>
          </div>
        </div>
        <Table
          data={users}
          columns={columns}
          page={page}
          limit={limit}
          onEdit={openEditModal}
          onDelete={openDeleteModal}
          idAccessor="userid"
          detailPage="users"
        />
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </>
  );
}
