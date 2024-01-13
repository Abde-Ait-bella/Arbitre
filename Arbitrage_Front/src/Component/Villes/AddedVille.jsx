import React from "react";
import { Link } from "react-router-dom";

function AddedVille() {



    return (
        <>
            <div className="d-flex justify-content-center mt-5">
                <div class="row col-md-12 d-flex d-flex justify-content-center">
                    <div class="col-lg-6 col-md-12 col-xl-6">
                        <div class="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                            <div class="ms-3">
                                <h2 class="mb-2 text-warning">تمة الاضافة بنجاح</h2>
                                {/* <h6 class="mb-0">$1234</h6> */}
                                <Link to="/composants/villes" class="btn btn-danger pe-3 pt-1 mt-3"> التالي<i class="fa-solid fa-caret-left me-3"></i></Link>
                            </div>
                            {/* <i class="fa fa-chart-line fa-3x text-primary"></i> */}
                            <i class="fa-solid fa-check-to-slot fa-3x text-danger"></i>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AddedVille;