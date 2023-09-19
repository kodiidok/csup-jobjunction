import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import styles from '@/app/page.module.css';
interface Room {
  id: string;
  stall: {
    floorPlanLocation: string;
    company: {
      name: string;
    };
  };
  roomNumber: string;
  roomStatus: string;
  // Add more room properties as needed
}

interface RoomModalProps {
  room: Room;
  onClose: () => void;
}

export default function RoomModal({ room }: RoomModalProps) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Authentication" centered>
        {/* Modal content */}
      </Modal>

      <Button onClick={open}>Open centered Modal</Button>
    </>
  );
}