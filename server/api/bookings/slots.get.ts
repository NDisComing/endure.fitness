export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const date = (query.date as string) || new Date().toISOString().split('T')[0]

  // Base PT hours: 07:00 to 12:00, and 16:00 to 20:00
  const availableTimes = [
    '07:00', '08:00', '09:00', '10:00', '11:00',
    '16:00', '17:00', '18:00', '19:00'
  ]

  return {
    success: true,
    trainer: {
      name: 'Marcus Vance',
      role: 'Head Coach & CSCS'
    },
    date,
    availableSlots: availableTimes
  }
})
