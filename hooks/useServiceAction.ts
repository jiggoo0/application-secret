"use client"

export const useServiceAction = () => {
  const handleExecute = (id: string, title: string) => {
    // Logic: เปิด Line หรือส่ง Event ไปที่ Analytics
    const message = `[System_Request]: สนใจบริการ ${title} (Ref:${id})`
    window.open(
      `https://line.me/ti/p/@yourid?text=${encodeURIComponent(message)}`,
      "_blank"
    )
  }

  return { handleExecute }
}
