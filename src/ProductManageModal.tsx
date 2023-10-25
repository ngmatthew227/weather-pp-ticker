import { useState } from "react";
import useProductStore from "./useProductStore";

interface ProductManageModalProps {
  onClose: () => void;
}

const ProductManageModal = ({ onClose }: ProductManageModalProps) => {
  const { products, addProduct, removeProduct } = useProductStore((state) => state);
  const [code, setCode] = useState("");

  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="flex justify-end">
              <button onClick={() => onClose()}>
                <svg className="h-6 w-6 text-red-600 mr-2 mt-2" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                  />
                </svg>
              </button>
            </div>
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <input className="w-full border border-gray-600 rounded-sm p-1" placeholder="Code" value={code} readOnly />
              <div className="flex mt-2">
                <div className="grid grid-cols-3 gap-1">
                  <button className="w-[50px] border border-gray-600 rounded-sm flex justify-center" onClick={() => setCode(code + "1")}>
                    1
                  </button>
                  <button className="w-[50px] border border-gray-600 rounded-sm flex justify-center" onClick={() => setCode(code + "2")}>
                    2
                  </button>
                  <button className="w-[50px] border border-gray-600 rounded-sm flex justify-center" onClick={() => setCode(code + "3")}>
                    3
                  </button>
                  <button className="w-[50px] border border-gray-600 rounded-sm flex justify-center" onClick={() => setCode(code + "4")}>
                    4
                  </button>
                  <button className="w-[50px] border border-gray-600 rounded-sm flex justify-center" onClick={() => setCode(code + "5")}>
                    5
                  </button>
                  <button className="w-[50px] border border-gray-600 rounded-sm flex justify-center" onClick={() => setCode(code + "6")}>
                    6
                  </button>
                  <button className="w-[50px] border border-gray-600 rounded-sm flex justify-center" onClick={() => setCode(code + "7")}>
                    7
                  </button>
                  <button className="w-[50px] border border-gray-600 rounded-sm flex justify-center" onClick={() => setCode(code + "8")}>
                    8
                  </button>
                  <button className="w-[50px] border border-gray-600 rounded-sm flex justify-center" onClick={() => setCode(code + "9")}>
                    9
                  </button>
                  <button className="w-[50px] border border-gray-600 rounded-sm flex justify-center" onClick={() => setCode("")}>
                    DEL
                  </button>
                  <button className="w-[50px] border border-gray-600 rounded-sm flex justify-center" onClick={() => setCode(code + "0")}>
                    0
                  </button>
                  <button
                    className="w-[50px] border border-gray-600 rounded-sm flex justify-center"
                    onClick={() => {
                      if (code.length === 0) {
                        return;
                      }
                      const hkCode = `HK.${code}`;
                      addProduct(hkCode);
                      setCode("");
                    }}
                  >
                    OK
                  </button>
                </div>
                <div className="ml-1">
                  {products.map((ele, idx) => {
                    return (
                      <div className="flex">
                        <div key={idx} className="w-[100px] bg-gray-400 rounded-md p-1 text-white truncate mb-1">
                          {ele}
                        </div>
                        <button
                          className="text-white font-bold bg-red-400 p-1 m-1 mt-0 rounded  hover:bg-red-500"
                          onClick={() => {
                            removeProduct(ele);
                          }}
                        >
                          D
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductManageModal;
