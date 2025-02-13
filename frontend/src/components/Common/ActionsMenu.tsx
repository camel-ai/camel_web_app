import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react"
import { BsThreeDotsVertical } from "react-icons/bs"
import { FiEdit, FiTrash } from "react-icons/fi"

import type {Task, UserPublic} from "../../client"
import EditUser from "../Admin/EditUser"
import Delete from "./DeleteAlert"

interface ActionsMenuProps {
  type: string
  value: Task | UserPublic
  disabled?: boolean
}

const ActionsMenu = ({ type, value, disabled }: ActionsMenuProps) => {
  const editUserModal = useDisclosure()
  const deleteModal = useDisclosure()

  return (
    <>
      <Menu>
        <MenuButton
          isDisabled={disabled}
          as={Button}
          rightIcon={<BsThreeDotsVertical />}
          variant="unstyled"
        />
        <MenuList>
          {type === "User" &&
            <MenuItem
              onClick={editUserModal.onOpen}
              icon={<FiEdit fontSize="16px" />}
            >
              Edit {type}
            </MenuItem>
          }
          <MenuItem
            onClick={deleteModal.onOpen}
            icon={<FiTrash fontSize="16px" />}
            color="ui.danger"
          >
            Delete {type}
          </MenuItem>
        </MenuList>
        {type === "User" &&
          <EditUser
            user={value as UserPublic}
            isOpen={editUserModal.isOpen}
            onClose={editUserModal.onClose}
          />
        }
        {type === "User" ? (
          <Delete
            type={type}
            id={(value as UserPublic).id}
            isOpen={deleteModal.isOpen}
            onClose={deleteModal.onClose}
          />
        ) : (
          <Delete
            type={type}
            id={(value as Task).task_id}
            isOpen={deleteModal.isOpen}
            onClose={deleteModal.onClose}
          />
        )}
      </Menu>
    </>
  )
}

export default ActionsMenu
