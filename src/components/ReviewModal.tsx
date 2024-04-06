import { useEffect } from 'react'
import styled from 'styled-components'
import { useApiUrlStore } from '../store/store'
import axios from 'axios'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react'

interface ReviewModalProps {
  isOpen: boolean
  onClose: () => void
}

function ReviewModal({ isOpen, onClose }: ReviewModalProps) {
  useEffect(() => {}, [])

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay bg="blackAlpha.200" />
        <ModalContent fontSize="4xl">
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>hello</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default ReviewModal
