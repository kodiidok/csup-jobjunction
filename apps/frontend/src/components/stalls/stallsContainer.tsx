import Stall from "./stall";

export interface StallInfo {
  img: string
  roomNumber: number,
  companyName: string,
  roomStatus: boolean
}

export interface StallsContainerProps {
  stalls: Array<StallInfo>;
}

export default function StallsContainer({ stalls }: StallsContainerProps) {
  return (
    <div>
      {
        stalls?.map((stall) => {
          return (
            <Stall key={stall.roomNumber} />
          );
        })
      }
    </div>
  )
}