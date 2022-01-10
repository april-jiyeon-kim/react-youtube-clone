class Youtube {
  constructor(httpClient) {
    this.youtube = httpClient;
  }

  async mostPopular() {
    const response = await this.youtube.get("videos", {
      params: {
        part: "snippet",
        chart: "mostPopular",
        maxResults: 25,
      },
    });
    const items = response.data.items.map((item) => ({
      ...item,
      category: this.channel(item.snippet.channelId),
    }));
    return items;
  }

  async search(query) {
    const response = await this.youtube.get("search", {
      params: {
        part: "snippet",
        maxResults: 25,
        type: "video",
        q: query,
      },
    });
    return response.data.items.map((item) => ({
      ...item,
      id: item.id.videoId,
    }));
  }

  async channel(id) {
    const response = await this.youtube.get("channels", {
      params: {
        part: "snippet",
        id,
      },
    });
    return response.data.items[0].snippet;
  }
}
export default Youtube;
