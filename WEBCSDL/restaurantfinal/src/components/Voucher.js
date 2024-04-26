import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { TokenContext } from './TokenContext.js'
import StaffCreate from './edit-components/StaffCreate.js';
import Notification from './edit-components/Notification.js';
import StaffEdited from './edit-components/StaffEdited.js';
import VoucherCreate from './edit-components/VoucherCreate.js';



function Voucher(){
    const [data, setData] = useState([]);
    const token = useContext(TokenContext);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [showStaffCreate, setShowStaffCreate] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [idStaff, setIdStaff] = useState();
    const [staff, setStaff] = useState();
    const [shouldFetchData, setShouldFetchData] = useState(true);
    const [showStaffEdited, setShowStaffEdited] = useState(false);




    useEffect(() => {
      if (shouldFetchData) {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://127.0.0.1:5000/api/voucher/all', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setData(response.data);
        } catch (error) {
          console.error(error);
        }
      };

      setShouldFetchData(false);
      fetchData();
    }
    }, [token, shouldFetchData]);

    const handleNotificationClose = () => {
      setNotificationMessage('');
    };

    const handleButtonAddClick = () => {
        setShowStaffCreate(true);
    }

    const handleCancelStaffCreate = () => {
      setShowStaffCreate(false)
    };

    const handleAddSuccess = () => {
      setShowStaffCreate(false);
      setNotificationMessage('Product added successfully.');
      setShouldFetchData(true)

    };

    const handleCancelDelete = () => {
      setShowDeleteConfirmation(false)
    }

    const handleConfirmDelete = async (event) => {
      setNotificationMessage("Delete Completed")
      setShowDeleteConfirmation(false)
      try {
        await axios.delete(`http://127.0.0.1:5000/api/voucher/del-voucher/${idStaff}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNotificationMessage('Product deleted successfully.');
        console.log("thành công")
        setShouldFetchData(true)
        // setProductList(prevList => prevList.filter(product => product.ma_mon !== idProduct));
        // ...
      } catch (error) {
        console.error(error);
        // Xử lý lỗi khi xóa món ăn
        // ...
      }
    };


    const handleDeleteCategoryClick = (item) => {
      setShowDeleteConfirmation(true)
      console.log(item)
      setIdStaff(item.ma_voucher)
      setStaff(item)
    }

    const handleEditedCategoryClick = (item) => {
      setShowStaffEdited(true)
      setStaff(item)
    }

    const handleCancelStaffEdited = () => {
      setShowStaffEdited(false)
    };



    return (
        
        <div className="main">
             <div id="title-display" className="header-category">
    <h1>Danh sách Voucher</h1>
  </div>
        <div id="display-product" className="display-category">
  <div id="add-category-btn">
    <button className="button-87" role="button" onClick={handleButtonAddClick}>
      <i className="fa-solid fa-plus" />
    </button>
  </div>
  <div className="list-category">
    <div className="title-category">
      <div className="category-line">
        <div className="index-category">ID</div>
        <div className="name-category product-name">Số điểm cần đổi</div>
      </div>
      <div className="status-product">
        <div className="product-category ">Phần trăm giảm</div>
        <div className="product-active">Số lượng</div>
      </div>
      <div className="category-function">
        <i className="fa-regular fa-pen-to-square edit-category btn-category btn-hidden" />
        <i className="fa-solid fa-eraser delete-category btn-category btn-hidden" />
      </div>
    </div>
  </div>
  <div className="items-category">
    {data.map((item) => (
        <div className="items-category">
        <div id={1} className="item-category">
          <div className="category-line">
            <div className="category-id">{item.ma_voucher}</div>
            <div className="category-name product-name">{item.diem}</div>
          </div>
          <div className="status-product">
            <div className="product-category">{item.phantram}</div>
            <div className="product-active ">{item.soluong}</div>
          </div>
          <div className="category-function">
            <i
              id="change-category-btn"
              className="fa-regular fa-pen-to-square edit-category btn-category"
              onClick={() => handleEditedCategoryClick(item)}
            />
            <i className="fa-solid fa-eraser delete-category btn-category" 
             onClick={() => handleDeleteCategoryClick(item)}
            />
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
{showDeleteConfirmation && (
          <div className="delete-confirmation">
            <p>Bạn muốn Xóa voucher?</p>
            <button onClick={handleConfirmDelete} >Xóa</button>
            <button onClick={handleCancelDelete}>Hủy</button>
          </div>
  )}

    {showStaffCreate && (
            <VoucherCreate
              onCancel={handleCancelStaffCreate}
              onAddSuccess={handleAddSuccess}
            />
          )}

{
        showStaffEdited && (
          <VoucherCreate
          onCancel={handleCancelStaffEdited}
          onAddSuccess={handleAddSuccess}
          selectedItem={staff}
        />
        )
      }
    {notificationMessage && (
        <Notification message={notificationMessage}  onClose={handleNotificationClose}/>
      )}
</div>
    )
}
export default Voucher