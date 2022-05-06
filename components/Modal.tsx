import { useRecoilState } from 'recoil'
import MuiModal from '@mui/material/Modal'

import { modalState } from '../atoms/modalAtom'
import { XIcon } from '@heroicons/react/solid'

export function Modal() {
  const [showModal, setShowModal] = useRecoilState(modalState)

  function handleClose() {
    setShowModal(false)
  }

  return (
    <MuiModal open={showModal}>
      <>
        <button
          onClick={handleClose}
          className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
        >
          <XIcon className="h-6 w-6" />
        </button>
      </>
    </MuiModal>
  )
}
