

const formatDate = (createdAt: number) => {

  const date = new Date(createdAt)

  const options: Intl.DateTimeFormatOptions = {
    month: 'numeric',
    day: "numeric",
    hour: 'numeric',
    minute: 'numeric',
  };

  return date.toLocaleDateString("fr-FR", options)
}

export default formatDate