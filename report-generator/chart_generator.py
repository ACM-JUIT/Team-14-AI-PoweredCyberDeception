import matplotlib
matplotlib.use("Agg")  # This line is critical — it stops matplotlib
                       # from trying to open a window on screen.
                       # Without it the script crashes on a server.
import matplotlib.pyplot as plt
import os


def generate_attack_bar_chart(attack_counts, output_path="attack_chart.png"):
    """
    Generates a bar chart image showing attack counts by type.
    Saves the image as a PNG file that can be inserted into the PDF.

    attack_counts — a dictionary like:
    {
        "SQL Injection": 47,
        "Brute Force": 23,
        "XSS": 15,
        "URL Scanning": 41,
        "Rate Limiting": 12,
        "Suspicious User Agent": 8
    }

    output_path — where to save the PNG image file
    """

    # If no data exists yet, create a placeholder chart
    if not attack_counts:
        attack_counts = {"No Data Yet": 0}

    attack_types = list(attack_counts.keys())
    counts = list(attack_counts.values())

    # Set up the chart size and style
    fig, ax = plt.subplots(figsize=(10, 5))
    fig.patch.set_facecolor("#1a1a1a")
    ax.set_facecolor("#1a1a1a")

    # Draw the bars
    bars = ax.barh(attack_types, counts, color="#cc0000", edgecolor="#ff4444")

    # Add count labels at the end of each bar
    for bar, count in zip(bars, counts):
        ax.text(
            bar.get_width() + 0.3,
            bar.get_y() + bar.get_height() / 2,
            str(count),
            va="center",
            color="white",
            fontsize=10,
            fontweight="bold"
        )

    # Style the chart text
    ax.set_xlabel("Number of Attacks", color="white", fontsize=11)
    ax.set_title("Attack Breakdown by Type", color="white", fontsize=14, fontweight="bold")
    ax.tick_params(colors="white")
    ax.xaxis.label.set_color("white")
    ax.title.set_color("white")

    for spine in ax.spines.values():
        spine.set_edgecolor("#444444")

    ax.tick_params(axis="x", colors="white")
    ax.tick_params(axis="y", colors="white")

    plt.tight_layout()

    # Save the chart as a PNG image
    plt.savefig(output_path, dpi=150, bbox_inches="tight", facecolor="#1a1a1a")
    plt.close()

    print(f"Chart saved to: {output_path}")
    return output_path
