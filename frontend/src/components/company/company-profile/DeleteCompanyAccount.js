import { useMutation } from "@apollo/client";
import React, { useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import { MyContext } from "../../../Context/Context";
import { DELETE_COMPANY } from "../../../graphQL/Mutations";

function DeleteCompanyAccount(props) {
  const { companyLoginData } = useContext(MyContext);

  const [deleteCompany, { data, loading, error }] = useMutation(
    DELETE_COMPANY,
    {
      awaitRefetchQueries: true,
    }
  );
  const deleteAccount = () => {
    //     Swal.fire({
    //       title: "Do you want to save the changes?",
    //       showDenyButton: true,
    //       showCancelButton: true,
    //       confirmButtonText: "Save",
    //       denyButtonText: `Don't save`,
    //     }).then((result) => {
    //       /* Read more about isConfirmed, isDenied below */
    //       if (result.isConfirmed) {
    //         Swal.fire("Saved!", "", "success");
    //       } else if (result.isDenied) {
    //         Swal.fire("Changes are not saved", "", "info");
    //       }
    //     });
    deleteCompany({
      variables: { deleteCompanyId: companyLoginData.id },
    }).then((res) => {
      if (res.data) {
        console.log(res.data);
        Swal.fire({
          position: "top",
          icon: "success",
          title: "profile updated successfully",
          showConfirmButton: false,
          timer: 1000,
        });
      }
      if (error) {
        Swal.fire({
          position: "top",
          icon: "error",
          title: "something went wrong",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    });
  };
  return (
    <div>
      <Modal {...props} size="lg" centered className="companyProfileUpdate">
        <Modal.Body className="text-center">
          <h4>Are you sure you want to Delete your company account</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
          <input
            type="submit"
            value="Delete"
            className="btn btn-danger"
            onClick={deleteAccount}
          />
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DeleteCompanyAccount;
