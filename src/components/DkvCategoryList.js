import React from 'react';

export default function dkvCategoryList({ renderdkvCategories, onDelete, onEdit }) {
  const dkvHandleDelete = (dkvCategory) => {
    if (window.confirm(`Bạn có thực sự muốn xóa Category có mã ${dkvCategory.dkvId} không ?`)) {
      onDelete(dkvCategory.dkvId);
    }
  };

  const dkvCategoryElement = renderdkvCategories.map((dkvCategory, index) => (
    <tr key={index}>
      <th>{index + 1}</th>
      <td>{dkvCategory.dkvid}</td>
      <td>{dkvCategory.dkvname}</td>
      <td>{dkvCategory.dkvStatus ? 'Hiển thị' : 'Tạm khóa'}</td>
      <td>
        <button className="btn btn-warning" onClick={() => onEdit(dkvCategory)}>
          Edit
        </button>
        <button className="btn btn-danger" onClick={() => dkvHandleDelete(dkvCategory)}>
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <div className="container m-2">
      <h2>Danh Sách Loại Sản Phẩm</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Mã loại</th>
            <th>Tên loại</th>
            <th>Trạng thái</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>{dkvCategoryElement}</tbody>
      </table>
      <button className="btn btn-primary" onClick={() => onEdit(null)}>
        Thêm Mới
      </button>
    </div>
  );
}
